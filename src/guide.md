# Guia de Integração do ConnectPro (Electron + Firebase Custom Claims)

Este guia contém os scripts e configurações para implementar o controle de licenciamento via Custom Claims no Firebase Auth para os seus aplicativos Electron (Fisio e PetShop).

## 1. Backend ADM: Atualizando Custom Claims (Node.js / firebase-admin)

Para definir Custom Claims, é obrigatório rodar o código em um ambiente de confiança (servidor Node.js, Express ou Firebase Cloud Functions) usando o `firebase-admin`.

**Exemplo de script para atualização de Claims:**

```javascript
// admin-backend.js
const admin = require('firebase-admin');
const serviceAccount = require('./caminho/para/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

/**
 * Atualiza os privilégios de um usuário no Firebase Auth
 * @param {string} uid - O ID do usuário (Firebase Auth UID)
 * @param {object} permissoes - Objeto de permissões (ex: { fisio: true, petShop: false })
 */
async function atualizarPermissoesUsuario(uid, permissoes) {
  try {
    // Busca claims atuais para não sobrescrever acidentalmente outras flags (como admin)
    const userRecord = await admin.auth().getUser(uid);
    const claimsAtuais = userRecord.customClaims || {};

    const novasClaims = {
      ...claimsAtuais,
      sistemas: permissoes // Ex: { fisio: true, pet: false }
    };

    // Define as Custom Claims
    await admin.auth().setCustomUserClaims(uid, novasClaims);

    console.log(`Claims atualizadas com sucesso para o usuário ${uid}`);
    return { success: true };
  } catch (error) {
    console.error('Erro ao atualizar claims:', error);
    return { success: false, error: error.message };
  }
}

// Exemplo de uso após o pagamento ou aprovação:
// atualizarPermissoesUsuario('UID_DO_CLIENTE_123', { fisio: true, pet: false });
```

---

## 2. App Cliente (Electron): Verificação de Login e Claims

No seu aplicativo cliente (ex: FisioConnectPro), implemente a captura e verificação de claims no processo Main do Electron para decidir se o banco SQLite pode ser carregado ou não.

**`main.js` (FisioConnectPro)**

```javascript
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { initializeApp } = require('firebase/app');
const { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} = require('firebase/auth');

// Inicialize o SDK v10 (Mesmas credenciais do Firebase Client SDK)
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  // ... (mesma configuração para Fisio, PetShop e ADM)
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

let mainWindow;

function createLoginWindow() {
  const loginWindow = new BrowserWindow({
    width: 400,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  loginWindow.loadFile('login.html'); // Interface de login local
  return loginWindow;
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.loadFile('index.html'); // App Fisio
}

app.whenReady().then(() => {
  const loginWin = createLoginWindow();

  // IPC: Escuta a tentativa de login do Renderer
  ipcMain.handle('attempt-login', async (event, { email, password }) => {
    try {
      // 1. Tenta autenticação
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Extrai o ID Token Result para ler as Claims
      // Forçamos o refresh do token passsando `true` para garantir que pegamos claims atualizadas
      const idTokenResult = await user.getIdTokenResult(true);
      
      const claims = idTokenResult.claims;
      
      // 3. Verifica a claim específica deste aplicativo
      if (claims?.sistemas?.fisio === true) {
        
        // --- 4. TRAVA DE SEGURANÇA SQLITE ---
        // Aqui nós inicializamos/abrimos o arquivo SQLite, pois a licença é válida.
        initSQLiteDatabase(user.uid); 

        // 5. Carrega a janela principal e fecha o login
        createMainWindow();
        loginWin.close();
        return { success: true };
      } else {
        // Sem permissão: desloga e barra a operação
        await signOut(auth);
        return { success: false, error: 'Acesso negado. Licença para Fisio inativa ou inválida.' };
      }
    } catch (error) {
      console.error('Erro de Login ou Conexão:', error);
      // Tratamento de falta de internet (erro de rede do Firebase)
      if (error.code === 'auth/network-request-failed') {
        return { success: false, error: 'Sem conexão com a internet. Verifique sua rede.' };
      }
      return { success: false, error: error.message };
    }
  });
});

// Exemplo de Injeção Isolada
function initSQLiteDatabase(userId) {
  const Database = require('better-sqlite3');
  // O banco só é instanciado AQUI, impossibilitando acesso antes do login valido.
  const db = new Database(`local_data_${userId}.db`);
  console.log('SQLite instanciado com sucesso após verificação de Claims.');
}
```

---

## 3. Sincronização e Forçar Atualização de Token

Você mencionou a necessidade de invalidar o acesso caso o ADM altere a licença com o app do cliente já aberto.

*Como o cliente descobre que a claim mudou?* O Token JWT dura por padrão 1 hora. Se o ADM revogar, o usuário teoricamente tem 1 hora de acesso. Para revogação em tempo real:

1. Guarde uma flag `refreshTime` ou a propriedade `status: false` em um documento no Firestore (ex: `licencas/{uid}`).
2. No App Cliente (Electron), crie um `onSnapshot` do Firestore escutando esse documento.
3. Se o Firestore notificar que o status virou `false`, force o refresh do token: `await auth.currentUser.getIdToken(true)` e depois chame o `signOut()`.

**Exemplo do Watchdog (Main ou Renderer):**
```javascript
const { doc, onSnapshot, getFirestore } = require('firebase/firestore');
const db = getFirestore(firebaseApp);

function iniciarWatchdogLicenca(uid) {
  onSnapshot(doc(db, 'licencas', uid), async (snapshot) => {
    const data = snapshot.data();
    if (!data || data.status === false) {
      console.log('Licença revogada pelo ADM! Deslogando em tempo real...');
      await auth.currentUser.getIdToken(true); // Força refresh pra pegar claims atualizadas (negadas)
      await signOut(auth);
      // Aqui você fecha a MainWindow e desliga/trava o SQLite
      if (mainWindow) mainWindow.close();
      // Mostra tela de expiração
    }
  });
}
```

---

## 4. Segurança do SQLite (Criptografia at-rest)

Se você precisa proteger os dados do banco local contra cópia física do arquivo `.db`, o `better-sqlite3` padrão não suporta criptografia transparente.

**A solução:**
Utilize um fork derivado do SQLCipher, como o node-sqlcipher, ou ferramentas como `better-sqlite3-multiple-ciphers`.

1. Salve uma a Master Key ou "Encryption Key" no documento do usuário no Firestore (apenas o próprio usuário poderá ler por causa do `firestore.rules`).
2. Quando ele fizer login, busque essa chave no Firebase.
3. Forneça essa chave PRAGMA para "destravar" o SQLite.

**Exemplo de destrave do SQLite:**
```javascript
async function initSecureSQLiteDatabase(uid) {
  const dbFirestore = getFirestore(firebaseApp);
  const docRef = doc(dbFirestore, 'licencas', uid);
  const snap = await getDoc(docRef);
  
  if (!snap.exists()) throw new Error('Dados de licença ausentes.');
  
  const encryptionKey = snap.data().sqliteKey; // Recupera a chave salva na nuvem
  
  const Database = require('better-sqlite3');
  const db = new Database(`local_data_${uid}.db`);
  
  // Ativa a criptografia com a chave do Firestore
  db.pragma(`key = '${encryptionKey}'`);
  
  // Testa a leitura. Se a chave estiver errada, vai disparar um erro
  db.prepare(`SELECT count(*) FROM sqlite_master`).get();
}
```
Isso une o melhor do Firebase Auth (Claims robustos) ao Firestore (Distribuição segura de chaves), mantendo a performance do SQLite no desktop.

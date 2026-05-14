const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { machineIdSync } = require('node-machine-id');
const { initializeApp } = require('firebase/app');
const { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut 
} = require('firebase/auth');
const { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc 
} = require('firebase/firestore');

// Cole as credenciais do seu projeto Firebase aqui
const firebaseConfig = {
  // apiKey: "SUA_API_KEY",
  // authDomain: "SEU_PROJETO.firebaseapp.com",
  // projectId: "SEU_PROJETO",
};

// Inicialização (evita erro caso config esteja vazia no boilerplate)
let firebaseApp;
let auth;
let db;

try {
  firebaseApp = initializeApp(firebaseConfig);
  auth = getAuth(firebaseApp);
  db = getFirestore(firebaseApp);
} catch (e) {
  console.log("Aviso: Configurações do Firebase ausentes.");
}

let loginWindow;
let mainWindow;

function createLoginWindow() {
  loginWindow = new BrowserWindow({
    width: 450,
    height: 550,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    title: 'FisioConnectPro - Login'
  });
  
  // Usando path absoluto para resolver a tela
  loginWindow.loadFile(path.join(__dirname, 'login.html'));
  loginWindow.setMenuBarVisibility(false);
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    },
    title: 'FisioConnectPro - Sistema de Fisioterapia'
  });
  
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  mainWindow.setMenuBarVisibility(false);
}

app.whenReady().then(() => {
  createLoginWindow();

  ipcMain.handle('attempt-login', async (event, { email, password }) => {
    if (!auth) return { success: false, error: 'Firebase não configurado.' };
    
    try {
      // 1. Tenta autenticação
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Extrai o ID Token Result para ler as Claims
      const idTokenResult = await user.getIdTokenResult(true);
      const claims = idTokenResult.claims;
      
      // 3. Verifica a claim específica de Fisioterapia
      if (claims?.sistemas?.fisio !== true) {
        await signOut(auth);
        return { success: false, error: 'Acesso negado. Esta conta não possui licença para o sistema Fisio.' };
      }

      // 4. Verificação no Firestore (Status, Validade e HWID)
      const licencaRef = doc(db, 'licencas', user.uid);
      const licencaSnap = await getDoc(licencaRef);

      if (!licencaSnap.exists()) {
        await signOut(auth);
        return { success: false, error: 'Registro de licença não encontrado.' };
      }

      const dadosLicenca = licencaSnap.data();

      if (dadosLicenca.status !== true) {
        await signOut(auth);
        return { success: false, error: 'Licença bloqueada no sistema.' };
      }

      if (dadosLicenca.validade < Date.now()) {
        await signOut(auth);
        return { success: false, error: 'Sua assinatura encontra-se expirada.' };
      }

      // 5. Coleta e Verifica o HWID
      const currentHWID = machineIdSync(true); // true = raw GUID
      
      if (!dadosLicenca.device_id || dadosLicenca.device_id === '') {
        // Primeiro acesso: vincula nova máquina
        await updateDoc(licencaRef, { device_id: currentHWID });
        console.log('Dispositivo vinculado:', currentHWID);
      } else if (dadosLicenca.device_id !== currentHWID) {
        // Limite de dispositivo (tentando logar em outra máquina)
        await signOut(auth);
        return { success: false, error: 'Limite de dispositivos atingido. Esta conta está vinculada a outra máquina.' };
      }

      // --- 6. TRAVA DE SEGURANÇA SQLITE ---
      initSQLiteDatabase(user.uid); 

      // 7. Carrega a janela principal
      createMainWindow();
      if (loginWindow) loginWindow.close();
      
      return { success: true };
    } catch (error) {
      console.error('Erro no login:', error);
      if (error.code === 'auth/network-request-failed') {
        return { success: false, error: 'Sem conexão. Verifique sua rede.' };
      }
      return { success: false, error: 'Credenciais inválidas ou erro no sistema.' };
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function initSQLiteDatabase(userId) {
  try {
    const Database = require('better-sqlite3');
    const db = new Database(`local_fisio_data_${userId}.db`);
    
    // Configurações e criação de tabelas básicas de exemplo
    db.pragma('journal_mode = WAL');
    db.exec(`
      CREATE TABLE IF NOT EXISTS pacientes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        telefone TEXT,
        criado_em DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    console.log('Banco de dados local instanciado com segurança.');
  } catch (error) {
    console.error('Erro ao instanciar banco de dados. Modulo better-sqlite3 pego?', error);
    // Em produção o electron ignora require nulos de modules nativos dependendo de como é buildado 
    // ou se o dev n instalou better-sqlite3 pra arquitetura correta.
  }
}

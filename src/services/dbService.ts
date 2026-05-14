import localforage from 'localforage';
import { v4 as uuidv4 } from 'uuid';
import { db, auth } from '../lib/firebase';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  getDocs, 
  onSnapshot, 
  query, 
  where, 
  Timestamp, 
  orderBy,
  limit
} from 'firebase/firestore';

// Configuração do armazenamento local
localforage.config({
  name: 'FisioConnectPro',
  storeName: 'app_data'
});

const INITIAL_DATA = [
  { name: 'Gilberto Andrade Silva', phone: '71999276495', insuranceName: 'Particular', cpf: '000.000.000-01' },
  { name: 'Henrique souza da cruz', phone: '71982551049', insuranceName: 'Particular', cpf: '000.000.000-02' },
  { name: 'Rita de cassia santos lima', phone: '71992210735', insuranceName: 'Particular', cpf: '000.000.000-03' },
  { name: 'Alaide Esmeralda de oliveira', phone: '71992210735', insuranceName: 'Particular', cpf: '000.000.000-04' },
  { name: 'Edna Ferreira Machado', phone: '71982551049', insuranceName: 'Particular', cpf: '000.000.000-05' }
];

export const dbService = {
  // Inicialização / Seed
  init: async () => {
    try {
      console.log('Verificando banco de dados (Sincronização)...');
      
      const user = auth.currentUser;
      if (!user) return;

      // 1. Seed inicial de pacientes se o Firestore estiver vazio
      const qPacientes = query(collection(db, 'pacientes'), limit(1));
      const snapshotPacientes = await getDocs(qPacientes);
      
      if (snapshotPacientes.empty) {
        console.log('Banco remoto vazio. Enviando dados iniciais...');
        for (const item of INITIAL_DATA) {
          await dbService.saveData('pacientes', item);
        }
      }

      // 2. Sincroniza dados locais com os remotos
      const collections = ['pacientes', 'consultas', 'profissionais', 'transactions', 'clinic', 'messages'];
      for (const colecao of collections) {
        try {
          const q = query(collection(db, colecao));
          const snapshot = await getDocs(q);
          const remoteDocs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
          
          if (remoteDocs.length > 0) {
            await localforage.setItem(`store_${colecao}`, remoteDocs);
          }
        } catch (e) {
          console.warn(`Erro ao sincronizar coleção ${colecao}:`, e);
        }
      }
    } catch (err) {
      console.error('Erro na inicialização do Banco de Dados:', err);
    }
  },

  saveData: async (colecao: string, dados: any) => {
    try {
      const user = auth.currentUser;
      const id = dados.id || dados._id || uuidv4();
      
      const docToSave = {
        ...dados,
        id: id,
        updatedAt: Date.now(),
        createdAt: dados.createdAt || Date.now(),
        userId: user?.uid || 'offline_user',
        sincronizado: false
      };

      // 1. Salva Localmente (LocalForage)
      const currentList: any[] = (await localforage.getItem(`store_${colecao}`)) || [];
      const index = currentList.findIndex(item => item.id === id);
      
      if (index >= 0) {
        currentList[index] = docToSave;
      } else {
        currentList.push(docToSave);
      }
      await localforage.setItem(`store_${colecao}`, currentList);

      // 2. Tenta salvar na Nuvem (Firestore)
      if (user) {
        try {
          const docRef = doc(db, colecao, id);
          
          await setDoc(docRef, {
            ...docToSave,
            sincronizado: true,
            serverUpdatedAt: Timestamp.now()
          });
          
          // Atualiza flag local para sincronizado
          const updatedList: any[] = (await localforage.getItem(`store_${colecao}`)) || [];
          const finalItems = updatedList.map(item => item.id === id ? { ...item, sincronizado: true } : item);
          await localforage.setItem(`store_${colecao}`, finalItems);
          
          return { sucesso: true, dado: { ...docToSave, sincronizado: true } };
        } catch (syncErr) {
          console.warn('[Sync] Offline ou erro de permissão: salvo apenas localmente.', syncErr);
          return { sucesso: true, dado: docToSave };
        }
      }

      return { sucesso: true, dado: docToSave };
    } catch (erro: any) {
      console.error('Erro ao salvar dados:', erro);
      return { sucesso: false, erro: erro.message };
    }
  },

  listAll: async (colecao: string) => {
    try {
      // Prioriza local para velocidade (Offline support)
      const dados: any[] = (await localforage.getItem(`store_${colecao}`)) || [];
      
      if (dados.length === 0) {
        // Fallback Firestore se local estiver vazio
        try {
            const q = query(collection(db, colecao), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const remoteDocs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            if (remoteDocs.length > 0) {
              await localforage.setItem(`store_${colecao}`, remoteDocs);
              return { sucesso: true, dados: remoteDocs };
            }
        } catch (e) {
            console.warn(`Fallback firestore falhou para ${colecao}:`, e);
        }
      }
      
      return { sucesso: true, dados };
    } catch (erro: any) {
      return { sucesso: false, erro: erro.message };
    }
  },

  listenPacientes: (callback: (pacientes: any[]) => void) => {
    const user = auth.currentUser;
    if (!user) {
      // Se não logado, tenta apenas local
      localforage.getItem('store_pacientes').then((data) => {
        if (data) callback(data as any[]);
      });
      return () => {};
    }

    const q = query(collection(db, 'pacientes'), orderBy('name', 'asc'));
    const unsubFirestore = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
        callback(docs);
        
        // Atualiza cache local
        localforage.setItem('store_pacientes', docs);
    }, (error) => {
        console.error('Erro no onSnapshot de pacientes:', error);
        // Fallback local em caso de erro de permissão/rede
        localforage.getItem('store_pacientes').then((data) => {
          if (data) callback(data as any[]);
        });
    });

    return () => unsubFirestore();
  },

  syncPendentes: async () => {
    console.log('Verificando sincronização pendente...');
    const collections = ['pacientes', 'consultas', 'profissionais', 'transactions', 'clinic', 'messages'];
    
    for (const name of collections) {
      const items: any[] = (await localforage.getItem(`store_${name}`)) || [];
      const pendentes = items.filter(item => !item.sincronizado);
      
      for (const item of pendentes) {
        await dbService.saveData(name, item);
      }
    }
  }
};

(window as any).api = {
    salvarDados: dbService.saveData,
    listarDados: dbService.listAll,
    syncPendentes: dbService.syncPendentes
};

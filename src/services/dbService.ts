import { v4 as uuidv4 } from 'uuid';
import { db } from '../lib/firebase';
import { doc, setDoc, getDoc, collection, getDocs, onSnapshot, query, where, Timestamp, orderBy } from 'firebase/firestore';

// Simplificando o serviço para usar Firestore diretamente
// Isso resolve o erro "Class extends value [object Object] is not a constructor"
// causado por incompatibilidade do PouchDB com o ambiente Vite/React sem polyfills complexos.

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
      const q = query(collection(db, 'pacientes'));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        console.log('Seeding initial data to Firestore...');
        for (const item of INITIAL_DATA) {
          const id = uuidv4();
          await setDoc(doc(db, 'pacientes', id), {
            ...item,
            id: id,
            createdAt: Date.now(),
            sincronizado: true
          });
        }
      }
    } catch (err) {
      console.error('Erro na inicialização do Firestore:', err);
    }
  },

  saveData: async (colecao: string, dados: any) => {
    try {
      const id = dados.id || dados._id || uuidv4();
      
      const docToSave = {
        ...dados,
        id: id,
        updatedAt: Date.now(),
        sincronizado: true,
        serverUpdatedAt: Timestamp.now()
      };

      // Remove campos do PouchDB se existirem
      if ('_id' in docToSave) delete (docToSave as any)._id;
      if ('_rev' in docToSave) delete (docToSave as any)._rev;

      // Salva direto no Firestore
      await setDoc(doc(db, colecao, id), docToSave);

      return { sucesso: true, dado: docToSave };
    } catch (erro: any) {
      console.error('Erro ao salvar dados no Firestore:', erro);
      return { sucesso: false, erro: erro.message };
    }
  },

  listAll: async (colecao: string) => {
    try {
      const q = query(collection(db, colecao), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const dados = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      return { sucesso: true, dados };
    } catch (erro: any) {
      return { sucesso: false, erro: erro.message };
    }
  },

  // Real-time listener para a UI
  listenPacientes: (callback: (pacientes: any[]) => void) => {
    const q = query(collection(db, 'pacientes'), orderBy('name', 'asc'));
    const unsubFirestore = onSnapshot(q, (snapshot) => {
        const docs = snapshot.docs.map(d => ({ ...d.data(), id: d.id }));
        callback(docs);
    }, (error) => {
        console.error('Erro no onSnapshot de pacientes:', error);
    });

    return () => unsubFirestore();
  }
};

// Auto-sync a cada 30 segundos
setInterval(() => {
    dbService.syncPendentes();
}, 30000);

// Expõe na window para simular o IPC bridge que o usuário espera
(window as any).api = {
    salvarDados: dbService.saveData,
    listarDados: dbService.listAll,
    // Adicionar outros se necessário
};

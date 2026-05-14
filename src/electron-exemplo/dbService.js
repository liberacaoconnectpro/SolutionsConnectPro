const PouchDB = require('pouchdb');
// PouchDB.plugin(require('pouchdb-find')); // Descomente para usar o db.find
const { v4: uuidv4 } = require('uuid');

// 1. Instanciação dos bancos de dados locais
const dbList = {
  pacientes: new PouchDB('pacientes_local'),
  consultas: new PouchDB('consultas_local'),
  profissionais: new PouchDB('profissionais_local'),
  clinic: new PouchDB('clinic_local'),
  transactions: new PouchDB('transactions_local'),
  messages: new PouchDB('messages_local'),
};

// Serviço fictício/exemplo para Firebase
const firebaseService = {
  save: async (doc) => {
    // Substituir pela integração real com Firestore
    console.log(`[Firestore Mock] Sincronizando doc: ${doc._id}`);
    return Promise.resolve();
  }
};

const dbService = {
  saveData: async (colecao, dados) => {
    try {
      const db = dbList[colecao];
      if (!db) throw new Error(`Coleção ${colecao} não encontrada.`);

      // 4. Mapeamento de Campos
      // Garante _id, timestamp e flag de sincronização
      const doc = {
        ...dados,
        _id: dados._id || uuidv4(),
        updatedAt: new Date().getTime(),
        sincronizado: false,
      };

      // Se houver rev (para atualizações), incluí-la
      if (dados._rev) {
          doc._rev = dados._rev;
      }

      const resposta = await db.put(doc);
      return { sucesso: true, dado: { ...doc, _rev: resposta.rev } };
    } catch (erro) {
      console.error('Erro ao salvar dados:', erro);
      return { sucesso: false, erro: erro.message };
    }
  },

  getData: async (colecao, id) => {
    try {
      const db = dbList[colecao];
      const doc = await db.get(id);
      return { sucesso: true, dado: doc };
    } catch (erro) {
      return { sucesso: false, erro: erro.message };
    }
  },

  listAll: async (colecao) => {
    try {
      const db = dbList[colecao];
      const resposta = await db.allDocs({ include_docs: true });
      const lista = resposta.rows.map(row => row.doc);
      return { sucesso: true, dados: lista };
    } catch (erro) {
      return { sucesso: false, erro: erro.message };
    }
  },
  
  deleteData: async (colecao, id, rev) => {
      try {
          const db = dbList[colecao];
          const resposta = await db.remove(id, rev);
          return { sucesso: true, resposta };
      } catch (erro) {
          return { sucesso: false, erro: erro.message };
      }
  },

  // Importação de dados (preservando ID)
  importData: async (colecao, dados) => {
    try {
      const db = dbList[colecao];
      if (!db) throw new Error(`Coleção ${colecao} não encontrada.`);

      const doc = {
        ...dados,
        _id: dados.id || dados._id || uuidv4(),
        updatedAt: dados.updatedAt || new Date().getTime(),
        sincronizado: true // Considerado já sincronizado
      };

      await db.put(doc);
      return { sucesso: true, dado: doc };
    } catch (erro) {
      console.error(`Erro ao importar dados para ${colecao}:`, erro);
      return { sucesso: false, erro: erro.message };
    }
  },

  // Escutar mudanças no banco para emitir para a UI
  listenChanges: (colecao, callback) => {
    const db = dbList[colecao];
    if (!db) return;
    
    db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', (change) => {
      callback(change);
    }).on('error', (err) => {
      console.error('Erro no listener de changes:', err);
    });
  },

  // Sincronização Periódica
  subirParaNuvem: async () => {
    // Para simplificar, vou percorrer todos os bancos de dbList
    for (const [colecao, db] of Object.entries(dbList)) {
        try {
            // Nota: usando allDocs caso pouchdb-find não esteja configurado
            const resultado = await db.allDocs({ include_docs: true });
            const pendentes = resultado.rows.map(row => row.doc).filter(doc => doc.sincronizado === false);
            
            for (let doc of pendentes) {
                try {
                    await firebaseService.save({...doc, colecao}); // Envia coleção pro mock apenas p/ contexto
                    
                    // Se subir, marca como true no PouchDB local
                    await db.put({ ...doc, sincronizado: true });
                    console.log(`[Sync] Registro sincronizado com a nuvem: ${doc._id} na coleção ${colecao}`);
                } catch (err) {
                    console.log(`[Sync] Falha ao tentar sincronizar ${doc._id}. Aguardando internet...`);
                }
            }
        } catch (err) {
            console.error(`Erro ao checar sincronização da coleção ${colecao}:`, err);
        }
    }
  }
};

// Iniciar um loop automático que roda a cada 10 segundos
setInterval(() => {
    dbService.subirParaNuvem();
}, 10000);

module.exports = dbService;

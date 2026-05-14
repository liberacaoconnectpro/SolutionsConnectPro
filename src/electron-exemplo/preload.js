// 2. LIGAÇÃO COM AS TELAS (IPC Communication)
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  // Chamadas de Banco de Dados genéricas
  salvarDados: (colecao, dados) => ipcRenderer.invoke('db-save', colecao, dados),
  buscarDados: (colecao, id) => ipcRenderer.invoke('db-get', colecao, id),
  listarDados:  (colecao) => ipcRenderer.invoke('db-list', colecao),
  excluirDados: (colecao, id, rev) => ipcRenderer.invoke('db-delete', colecao, id, rev),
  
  // 3. REAÇÃO EM TEMPO REAL (Listeners para a UI)
  onMudancaPacientes: (callback) => {
      // Cria o ouvinte seguro para o canal 'db-change-pacientes'
      ipcRenderer.on('db-change-pacientes', (event, mudanca) => callback(mudanca));
  }
});

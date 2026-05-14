const { contextBridge, ipcRenderer } = require('electron');

// Expõe APIs seguras para o processo de renderização (React)
contextBridge.exposeInMainWorld('electronAPI', {
  getHwid: () => ipcRenderer.invoke('get-hwid'),
  isElectron: true
});

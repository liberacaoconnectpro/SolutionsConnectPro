const { app, BrowserWindow, ipcMain } = require('electron');
const dbService = require('./dbService');
const seedDatabase = require('./seedDatabase');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: __dirname + '/preload.js', // Aponta para o preload
      contextIsolation: true,             // Essencial para segurança
      nodeIntegration: false
    }
  });

  mainWindow.loadFile('index.html');

  // Registrar auto-run do seed (opcional: pode adicionar lógica para rodar only if empty)
  seedDatabase().then(() => console.log("Dados base carregados."));

  // ==========================================
  // REGISTRO DOS CANAIS IPC (Back-end)
  // ==========================================
  ipcMain.handle('db-save', async (event, colecao, dados) => {
    return await dbService.saveData(colecao, dados);
  });

  ipcMain.handle('db-get', async (event, colecao, id) => {
    return await dbService.getData(colecao, id);
  });

  ipcMain.handle('db-list', async (event, colecao) => {
    return await dbService.listAll(colecao);
  });
  
  ipcMain.handle('db-delete', async (event, colecao, id, rev) => {
      return await dbService.deleteData(colecao, id, rev);
  });

  // ==========================================
  // REAL-TIME UPDATES (PouchDB -> Renderer)
  // ==========================================
  // Se houver uma alteração na collection "pacientes", avisamos a tela
  dbService.listenChanges('pacientes', (change) => {
    mainWindow.webContents.send('db-change-pacientes', change);
  });
}

app.whenReady().then(() => {
  createWindow();
});

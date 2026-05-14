const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { machineIdSync } = require('node-machine-id');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true, // Melhor prática de segurança
      preload: path.join(__dirname, 'preload.cjs')
    },
    title: 'FisioConnect Pro'
  });

  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    mainWindow.loadURL('http://localhost:3000').catch(() => {
      console.log('Servidor dev não encontrado em :3000, tentando carregar arquivo local...');
      mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
    });
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

// Canal IPC para pegar o ID da máquina (HWID)
ipcMain.handle('get-hwid', () => {
  try {
    return machineIdSync(true); // true = raw GUID
  } catch (error) {
    console.error('Erro ao pegar HWID:', error);
    return 'ID_NAO_DISPONIVEL';
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

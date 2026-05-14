const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { machineIdSync } = require('node-machine-id');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    title: 'FisioConnect Pro'
  });

  // Verifica se estamos em ambiente de desenvolvimento ou produção
  // No AI Studio, usamos o arquivo gerado (dist/index.html) para o build final
  const isDev = process.env.NODE_ENV === 'development';

  if (isDev) {
    // Em dev local, você pode carregar da porta do Vite
    mainWindow.loadURL('http://localhost:3000');
  } else {
    // Em produção (ou após o build), carregamos o arquivo estático
    const indexPath = path.join(__dirname, 'dist', 'index.html');
    mainWindow.loadFile(indexPath);
  }

  // Opcional: Abre o DevTools se estiver em dev
  if (isDev) {
    mainWindow.webContents.openDevTools();
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

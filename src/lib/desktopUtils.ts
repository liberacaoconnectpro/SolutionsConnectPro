/**
 * Utilitários para interação com o processo principal do Electron
 */

export async function getMachineId(): Promise<string> {
  // Verifica se o objeto 'window.require' ou 'window.ipcRenderer' existe
  // Note: Para isso funcionar, nodeIntegration deve estar ativado na BrowserWindow (como fizemos no electron-main.cjs)
  
  try {
    if (window && (window as any).ipcRenderer) {
      return await (window as any).ipcRenderer.invoke('get-hwid');
    }
    
    // Fallback para quando estamos no navegador (não Electron)
    console.warn('Executando fora do ambiente Electron. HWID não disponível.');
    return 'BROWSER_IDENTIFIER_' + Math.random().toString(36).substring(2, 11);
  } catch (error) {
    console.error('Erro ao chamar get-hwid:', error);
    return 'ERROR_GETTING_HWID';
  }
}

export function isElectron(): boolean {
  return typeof window !== 'undefined' && !!(window as any).ipcRenderer;
}

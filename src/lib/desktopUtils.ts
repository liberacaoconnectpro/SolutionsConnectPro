/**
 * Utilitários para interação com o processo principal do Electron
 */

export async function getMachineId(): Promise<string> {
  try {
    if (window && (window as any).electronAPI) {
      return await (window as any).electronAPI.getHwid();
    }
    
    console.warn('Executando fora do ambiente Electron ou API não carregada.');
    return 'BROWSER_IDENTIFIER_' + Math.random().toString(36).substring(2, 11);
  } catch (error) {
    console.error('Erro ao pegar HWID:', error);
    return 'ERROR_GETTING_HWID';
  }
}

export function isElectron(): boolean {
  return typeof window !== 'undefined' && !!(window as any).electronAPI;
}

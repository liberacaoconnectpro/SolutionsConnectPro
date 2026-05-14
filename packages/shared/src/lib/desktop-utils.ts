/**
 * Interface representativa do objeto exposto via contextBridge no preload script do Electron.
 * Garante segurança de tipo ao acessar window.electronAPI.
 */
export interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  openExternal: (url: string) => Promise<void>;
  showNotification: (title: string, body: string) => Promise<void>;
  getHwid: () => Promise<string>;
  // Adicione outros métodos conforme necessário
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

/**
 * Detecta se a aplicação está rodando em ambiente desktop (Electron).
 * SSR-safe.
 */
export const isDesktop = (): boolean => {
  return typeof window !== 'undefined' && !!window.electronAPI;
};

/**
 * Retorna a versão do aplicativo.
 * Caso esteja no browser, retorna "web".
 */
export const getAppVersion = async (): Promise<string> => {
  if (isDesktop() && window.electronAPI) {
    try {
      return await window.electronAPI.getAppVersion();
    } catch (error) {
      console.error('Falha ao obter versão via Electron:', error);
      return 'desktop-unknown';
    }
  }
  return 'web';
};

/**
 * Abre uma URL no navegador padrão do sistema.
 * Se estiver no browser, usa window.open.
 */
export const openExternalLink = (url: string): void => {
  if (isDesktop() && window.electronAPI) {
    window.electronAPI.openExternal(url).catch((err) => {
      console.error('Erro ao abrir link externo no Electron:', err);
      // Fallback para window.open se o IPC falhar
      if (typeof window !== 'undefined') {
        window.open(url, '_blank', 'noopener,noreferrer');
      }
    });
  } else if (typeof window !== 'undefined') {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
};

/**
 * Exibe uma notificação do sistema.
 * Usa notificações nativas do Electron se disponível,
 * fallback para a Web Notification API.
 */
export const showNativeNotification = (title: string, body: string): void => {
  if (isDesktop() && window.electronAPI) {
    window.electronAPI.showNotification(title, body).catch((err) => {
      console.error('Erro ao mostrar notificação no Electron:', err);
      webNotificationFallback(title, body);
    });
  } else {
    webNotificationFallback(title, body);
  }
};

/**
 * Fallback para notificações da Web API
 */
const webNotificationFallback = (title: string, body: string): void => {
  if (typeof window === 'undefined' || !('Notification' in window)) return;

  if (Notification.permission === 'granted') {
    new Notification(title, { body });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        new Notification(title, { body });
      }
    });
  }
};

/**
 * Utilitário original mantido para compatibilidade, com tipagem melhorada
 */
export async function getMachineId(): Promise<string> {
  if (isDesktop() && window.electronAPI) {
    try {
      return await window.electronAPI.getHwid();
    } catch (error) {
      console.error('Erro ao pegar HWID:', error);
      return 'ERROR_GETTING_HWID';
    }
  }
  
  return 'BROWSER_IDENTIFIER_' + Math.random().toString(36).substring(2, 11);
}

// Retro-compatibilidade com nome antigo se necessário
export const isElectron = isDesktop;

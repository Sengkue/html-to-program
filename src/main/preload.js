const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
  // File operations
  refreshFiles: () => ipcRenderer.invoke('refresh-files'),
  createNewFile: () => ipcRenderer.invoke('create-new-file'),
  openFolder: () => ipcRenderer.invoke('open-folder'),
  
  // System operations
  getSystemStatus: () => ipcRenderer.invoke('get-system-status'),
  checkForUpdates: () => ipcRenderer.invoke('check-for-updates'),
  
  // Window operations
  minimize: () => ipcRenderer.invoke('window-minimize'),
  maximize: () => ipcRenderer.invoke('window-maximize'),
  close: () => ipcRenderer.invoke('window-close'),
  
  // Settings
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  
  // Listeners for main process events
  onRefreshFiles: (callback) => ipcRenderer.on('refresh-files', callback),
  onCreateNewFile: (callback) => ipcRenderer.on('create-new-file', callback),
  onOpenFolder: (callback) => ipcRenderer.on('open-folder', callback),
  onOpenSettings: (callback) => ipcRenderer.on('open-settings', callback),
  onWindowMaximized: (callback) => ipcRenderer.on('window-maximized', callback),
  onWindowUnmaximized: (callback) => ipcRenderer.on('window-unmaximized', callback),
  
  // Remove listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
  
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  getPlatform: () => process.platform,
  
  // Logging (for debugging)
  logToMain: (message) => ipcRenderer.invoke('log-message', message)
});

// Expose a limited API for your specific app needs
contextBridge.exposeInMainWorld('happyFiles', {
  // API calls to your backend server
  makeAPICall: async (endpoint, options = {}) => {
    // This is still using fetch, but now it's explicitly exposed
    const baseURL = 'http://localhost:3000';
    try {
      const response = await fetch(`${baseURL}${endpoint}`, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : undefined
      });
      return await response.json();
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }
});

// Expose translation API
contextBridge.exposeInMainWorld('translator', {
  // Translate text
  translateText: async (text, to, from = 'auto') => {
    return await ipcRenderer.invoke('translate-text', { text, to, from });
  },
  
  // Translate multiple texts
  translateMultiple: async (texts, to, from = 'auto') => {
    return await ipcRenderer.invoke('translate-multiple', { texts, to, from });
  },
  
  // Detect language
  detectLanguage: async (text) => {
    return await ipcRenderer.invoke('detect-language', { text });
  },
  
  // Get available languages
  getAvailableLanguages: async () => {
    return await ipcRenderer.invoke('get-available-languages');
  }
});

// Security: Remove eval and other dangerous functions
delete window.eval;
delete window.Function;

console.log('Preload script loaded successfully');
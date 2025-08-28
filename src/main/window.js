const { BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  // Create the browser window
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
  nodeIntegration: true,          // ເປີດໃຫ້ງ່າຍຂຶ້ນກ່ອນ
  contextIsolation: false,        // ປິດກ່ອນ
  enableRemoteModule: false,
  preload: path.join(__dirname, 'preload.js'),
  webSecurity: false              // ສຳລັບ development ເທົ່ານັ້ນ
},
    icon: getIconPath(),
    show: false,                       // Don't show until ready (prevents flash)
    titleBarStyle: process.platform === 'darwin' ? 'hiddenInset' : 'default',
    backgroundColor: '#667eea',        // Match your app's background
    title: 'Happy Files Viewer'
  });

  // Load the HTML file
  mainWindow.loadFile(path.join(__dirname, '..', 'renderer', 'index.html'));

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus window on creation
    if (process.platform === 'win32') {
      mainWindow.focus();
    }
  });

  // Handle window state changes
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-maximized');
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-unmaximized');
  });

  // Development only: Open DevTools
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }

  return mainWindow;
}

function getIconPath() {
  const iconName = process.platform === 'win32' ? 'icon.ico' 
                  : process.platform === 'darwin' ? 'icon.icns' 
                  : 'icon.png';
  
  return path.join(__dirname, '..', '..', 'build', iconName);
}

// Window management utilities
function centerWindow(window) {
  const { screen } = require('electron');
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;
  
  const windowWidth = window.getBounds().width;
  const windowHeight = window.getBounds().height;
  
  window.setPosition(
    Math.round((width - windowWidth) / 2),
    Math.round((height - windowHeight) / 2)
  );
}

function saveWindowState(window) {
  // Save window state for next launch (you can use electron-store for this)
  const bounds = window.getBounds();
  const isMaximized = window.isMaximized();
  
  // Store in user preferences
  return { bounds, isMaximized };
}

function restoreWindowState(window, savedState) {
  if (savedState && savedState.bounds) {
    window.setBounds(savedState.bounds);
    
    if (savedState.isMaximized) {
      window.maximize();
    }
  } else {
    centerWindow(window);
  }
}

module.exports = {
  createWindow,
  centerWindow,
  saveWindowState,
  restoreWindowState
};
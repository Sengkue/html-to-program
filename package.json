const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { createMenu } = require('./menu');
const { createWindow } = require('./window');
const Translator = require('../shared/translator');

// ແກ້ໄຂບັນຫາ GPU process error
app.disableHardwareAcceleration();

// ເພີ່ມ command line switches ເພື່ອແກ້ບັນຫາ GPU
app.commandLine.appendSwitch('--disable-gpu');
app.commandLine.appendSwitch('--disable-gpu-sandbox');
app.commandLine.appendSwitch('--disable-software-rasterizer');
app.commandLine.appendSwitch('--disable-features', 'VizDisplayCompositor');

// Initialize translator
const translator = new Translator();

// Keep a global reference of the window object
let mainWindow;

// Enable live reload for Electron in development
if (process.env.NODE_ENV === 'development') {
  require('electron-reload')(__dirname, {
    electron: path.join(__dirname, '..', '..', 'node_modules', '.bin', 'electron'),
    hardResetMethod: 'exit'
  });
}

function initializeApp() {
  // Create the main application window
  mainWindow = createWindow();
  
  // Create the application menu
  createMenu(mainWindow);
  
  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Security: Prevent new window creation
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    // Allow only certain URLs if needed
    return { action: 'deny' };
  });

  // Security: Prevent navigation to external websites
  mainWindow.webContents.on('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);
    
    if (parsedUrl.origin !== 'file://') {
      event.preventDefault();
    }
  });
}

// App event handlers
app.whenReady().then(() => {
  initializeApp();
  
  // Set up translation IPC handlers
  setupTranslationHandlers();

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      initializeApp();
    }
  });
});

app.on('window-all-closed', () => {
  // On macOS, keep app running even when all windows are closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Security: Prevent webSecurity bypass in production
app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    event.preventDefault();
  });
});

// Translation IPC handlers
function setupTranslationHandlers() {
  // Translate text
  ipcMain.handle('translate-text', async (event, { text, to, from }) => {
    try {
      console.log(`Translating: "${text}" from ${from || 'auto'} to ${to}`);
      const result = await translator.translateText(text, to, from);
      return result;
    } catch (error) {
      console.error('Translation error in main process:', error);
      return {
        success: false,
        error: error.message,
        originalText: text
      };
    }
  });

  // Translate multiple texts
  ipcMain.handle('translate-multiple', async (event, { texts, to, from }) => {
    try {
      console.log(`Translating ${texts.length} texts from ${from || 'auto'} to ${to}`);
      const results = await translator.translateMultiple(texts, to, from);
      return results;
    } catch (error) {
      console.error('Multiple translation error:', error);
      return texts.map(text => ({
        success: false,
        error: error.message,
        originalText: text
      }));
    }
  });

  // Detect language
  ipcMain.handle('detect-language', async (event, { text }) => {
    try {
      console.log(`Detecting language for: "${text}"`);
      const result = await translator.detectLanguage(text);
      return result;
    } catch (error) {
      console.error('Language detection error:', error);
      return {
        success: false,
        error: error.message,
        text: text
      };
    }
  });

  // Get available languages
  ipcMain.handle('get-available-languages', async () => {
    try {
      const languages = translator.getAvailableLanguages();
      return {
        success: true,
        languages: languages
      };
    } catch (error) {
      console.error('Get languages error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  });

  console.log('Translation IPC handlers set up successfully');
}

// Handle app updates (if using electron-updater)
if (process.env.NODE_ENV === 'production') {
  const { autoUpdater } = require('electron-updater');
  
  autoUpdater.checkForUpdatesAndNotify();
  
  autoUpdater.on('update-available', () => {
    console.log('Update available');
  });
}

// Export for testing
module.exports = { app };
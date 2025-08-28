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
app.commandLine.appendSwitch('--disable-accelerated-2d-canvas');
app.commandLine.appendSwitch('--disable-accelerated-jpeg-decoding');
app.commandLine.appendSwitch('--disable-accelerated-mjpeg-decode');
app.commandLine.appendSwitch('--disable-accelerated-video-decode');
app.commandLine.appendSwitch('--use-gl', 'swiftshader');
app.commandLine.appendSwitch('--ignore-gpu-blacklist');
app.commandLine.appendSwitch('--disable-background-timer-throttling');
app.commandLine.appendSwitch('--disable-backgrounding-occluded-windows');
app.commandLine.appendSwitch('--disable-renderer-backgrounding');

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

// File management IPC handlers
function setupFileHandlers() {
  // Refresh files
  ipcMain.handle('refresh-files', async () => {
    try {
      // Simulate file loading - replace with actual file system operations
      const files = [
        {
          name: 'sample-file-1.txt',
          created: new Date().toISOString(),
          content: 'ນີ້ແມ່ນໄຟລ໌ຕົວຢ່າງ. ການແປພາສາເຮັດວຽກໄດ້ແລ້ວ!',
          size: 256
        },
        {
          name: 'sample-file-2.txt', 
          created: new Date(Date.now() - 3600000).toISOString(),
          content: 'ອີກໄຟລ໌ຕົວຢ່າງນຶ່ງທີ່ສະແດງການສະໜັບສະໜູນຫຼາຍພາສາ. ລອງໃຊ້ເຄື່ອງມືການແປຂ້າງເທິງ!',
          size: 512
        }
      ];
      
      return {
        success: true,
        files: files
      };
    } catch (error) {
      console.error('Refresh files error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  });

  // Create new file
  ipcMain.handle('create-new-file', async () => {
    try {
      console.log('Creating new file...');
      // Simulate file creation
      return {
        success: true,
        message: 'File created successfully'
      };
    } catch (error) {
      console.error('Create file error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  });

  // Get system status
  ipcMain.handle('get-system-status', async () => {
    try {
      return {
        success: true,
        totalActive: 2,
        status: 'Running'
      };
    } catch (error) {
      console.error('System status error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  });

  // Window controls
  ipcMain.handle('window-minimize', async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    window.minimize();
  });

  ipcMain.handle('window-maximize', async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    if (window.isMaximized()) {
      window.unmaximize();
    } else {
      window.maximize();
    }
  });

  ipcMain.handle('window-close', async (event) => {
    const window = BrowserWindow.fromWebContents(event.sender);
    window.close();
  });

  console.log('File management IPC handlers set up successfully');
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
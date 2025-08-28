const { Menu, shell, dialog } = require('electron');

function createMenu(mainWindow) {
  const isMac = process.platform === 'darwin';

  const template = [
    // App Menu (macOS only)
    ...(isMac ? [{
      label: 'Happy Files Viewer',
      submenu: [
        { role: 'about' },
        { type: 'separator' },
        { role: 'services' },
        { type: 'separator' },
        { role: 'hide' },
        { role: 'hideothers' },
        { role: 'unhide' },
        { type: 'separator' },
        { role: 'quit' }
      ]
    }] : []),

    // File Menu
    {
      label: 'File',
      submenu: [
        {
          label: 'Refresh Files',
          accelerator: 'CmdOrCtrl+R',
          click: () => {
            mainWindow.webContents.send('refresh-files');
          }
        },
        {
          label: 'Create New File',
          accelerator: 'CmdOrCtrl+N',
          click: () => {
            mainWindow.webContents.send('create-new-file');
          }
        },
        { type: 'separator' },
        {
          label: 'Open Happy Folder',
          accelerator: 'CmdOrCtrl+O',
          click: async () => {
            // You can implement folder opening logic here
            mainWindow.webContents.send('open-folder');
          }
        },
        { type: 'separator' },
        ...(isMac ? [] : [
          {
            label: 'Settings',
            accelerator: 'CmdOrCtrl+,',
            click: () => {
              mainWindow.webContents.send('open-settings');
            }
          },
          { type: 'separator' }
        ]),
        isMac ? { role: 'close' } : { role: 'quit' }
      ]
    },

    // Edit Menu
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectall' }
      ]
    },

    // View Menu
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'CmdOrCtrl+Shift+R',
          click: () => {
            mainWindow.webContents.reload();
          }
        },
        {
          label: 'Force Reload',
          accelerator: 'CmdOrCtrl+Shift+F5',
          click: () => {
            mainWindow.webContents.reloadIgnoringCache();
          }
        },
        {
          label: 'Toggle Developer Tools',
          accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I',
          click: () => {
            mainWindow.webContents.toggleDevTools();
          }
        },
        { type: 'separator' },
        { role: 'resetzoom' },
        { role: 'zoomin' },
        { role: 'zoomout' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },

    // Window Menu
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front' },
          { type: 'separator' },
          { role: 'window' }
        ] : [])
      ]
    },

    // Help Menu
    {
      role: 'help',
      submenu: [
        {
          label: 'About Happy Files Viewer',
          click: () => {
            showAboutDialog(mainWindow);
          }
        },
        {
          label: 'Learn More',
          click: async () => {
            await shell.openExternal('https://github.com/yourusername/happy-files-viewer');
          }
        },
        { type: 'separator' },
        {
          label: 'Report Issue',
          click: async () => {
            await shell.openExternal('https://github.com/yourusername/happy-files-viewer/issues');
          }
        },
        {
          label: 'Check for Updates',
          click: () => {
            // Implement update check logic
            mainWindow.webContents.send('check-for-updates');
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function showAboutDialog(mainWindow) {
  dialog.showMessageBox(mainWindow, {
    type: 'info',
    title: 'About Happy Files Viewer',
    message: 'Happy Files Viewer',
    detail: `Version: 1.0.0
Platform: ${process.platform}
Electron: ${process.versions.electron}
Node: ${process.versions.node}

A modern desktop application for viewing your happy files.`,
    buttons: ['OK']
  });
}

// Context menu for the renderer process
function createContextMenu() {
  return Menu.buildFromTemplate([
    { role: 'cut' },
    { role: 'copy' },
    { role: 'paste' },
    { type: 'separator' },
    { role: 'selectall' }
  ]);
}

module.exports = {
  createMenu,
  createContextMenu,
  showAboutDialog
};
const url                                  = require('url');
const path2                                = require('path');
const appState: Store                      = require('./Store/rootStore').appState;
const loadDevTool                          = require('electron-load-devtool');
const { app, ipcMain, BrowserWindow }      = require('electron');
let mainWindow: any;

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 800,
      height: 650,
    });

  const loadUrl = url.format({
    pathname: path2.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  });

  // mainWindow.loadURL(loadUrl);
  mainWindow.loadURL('http://localhost:3000');

  loadDevTool(loadDevTool.REDUX_DEVTOOLS);
  loadDevTool(loadDevTool.REACT_DEVELOPER_TOOLS);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// ======================== Store ========================

ipcMain.on('load-store', () => {
  const store = appState.get('store');
  mainWindow.webContents.send('loading-store', store);
});

ipcMain.on('save-store', (event, store) => {
  appState.set('store', store);
});

const electron                                              = require('electron');
const path                                                  = require('path');
const urlFormat                                             = require('url');
const { app, BrowserWindow, Menu, ipcMain, shell, session } = require('electron');

let mainWindow;

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow              = new BrowserWindow({
    width: width - 500,
    height: height - 200,
    title: 'Emailer',
    center: true,
  });

  if (true) {
    const loadUrl = urlFormat.format({
      pathname: path.join(__dirname, '../index.html'),
      protocol: 'file:',
      slashes: true,
    });
    mainWindow.loadURL(loadUrl);
  } else {
    mainWindow.loadURL('http://localhost:8080');
    const loadDevTool = require('electron-load-devtool');
    loadDevTool(loadDevTool.REDUX_DEVTOOLS);
    loadDevTool(loadDevTool.REACT_DEVELOPER_TOOLS);
    mainWindow.toggleDevTools();
  }

  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
  mainWindow.webContents.session.clearStorageData();
}

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('ready', () => {
  createWindow();
  if (process.platform === 'darwin') {
    createMenuForMac();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function createMenuForMac() {
  Menu.setApplicationMenu(Menu.buildFromTemplate([
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'pasteandmatchstyle' },
        { role: 'delete' },
        { role: 'selectall' },
      ],
    },
  ]));
}

ipcMain.on('authorized-google', (e, url) => {
  const loginWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: false },
  });

  loginWindow.webContents.on('will-navigate', (event, newUrl) => {
    extractResponseFromPage(newUrl, loginWindow);
  });

  loginWindow.webContents.on('did-get-redirect-request', (event, oldUrl, newUrl) => {
    extractResponseFromPage(newUrl, loginWindow);
  });

  loginWindow.loadURL(url);
});

function extractResponseFromPage(url, loginWindow) {
  if (url.includes('emailer-electron-laravel.cronix.life/api/')) {
    const javaScript = `document.body.children.length === 1 && document.querySelector('pre').innerText;`;
    loginWindow.webContents.executeJavaScript(javaScript, result => {
      if (result) {
        mainWindow.webContents.send(`authorized-google-success`, result);
        if (!loginWindow.isDestroyed()) {
          loginWindow.close();
        }
      }
    });
  }
}

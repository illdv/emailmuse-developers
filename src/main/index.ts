const electron = require('electron');
const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  shell,
  dialog,
} = require('electron');
const log = require('electron-log');
const { autoUpdater } = require('electron-updater');
const path = require('path');
const urlFormat = require('url');
const loadDevTool = require('electron-load-devtool');

let mainWindow;

let isProduction = false;

try {
  isProduction = IS_PRODUCTION;
} catch (e) {
  console.log('Failed get IS_PRODUCTION in Electron!');
}

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width - 500,
    height: height - 200,
    title: 'EmailMuse',
    center: true,
  });

  if (isProduction) {
    const loadUrl = urlFormat.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file:',
      slashes: true,
    });
    mainWindow.loadURL(loadUrl);
  } else {
    mainWindow.loadURL('http://localhost:8080');
    loadDevTool(loadDevTool.REDUX_DEVTOOLS);
    loadDevTool(loadDevTool.REACT_DEVELOPER_TOOLS);
    mainWindow.toggleDevTools();
  }

  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
}

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

function sendStatusToWindow(text) {
  log.info(text);
  mainWindow.webContents.send('message', text);
}

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', info => {
  sendStatusToWindow('Update available.');
});
autoUpdater.on('update-not-available', info => {
  sendStatusToWindow('Update not available.');
});
autoUpdater.on('error', err => {
  sendStatusToWindow('Error in auto-updater. ' + err);
});
autoUpdater.on('download-progress', progressObj => {
  let logMessage = 'Download speed: ' + progressObj.bytesPerSecond;
  logMessage =
    logMessage + ' - Downloaded ' + Math.floor(progressObj.percent) + '%';
  logMessage =
    logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
  sendStatusToWindow(logMessage);
});
autoUpdater.on('update-downloaded', info => {
  sendStatusToWindow('Update downloaded');
});

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
  if (isProduction) {
    autoUpdater.checkForUpdatesAndNotify();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function createMenuForMac() {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
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
    ]),
  );
}

ipcMain.on('authorized-google', (e, url) => {
  const loginWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: false },
  });

  loginWindow.webContents.on('will-navigate', (event, newUrl) => {
    extractResponseFromPage(newUrl, loginWindow);
  });

  // loginWindow.webContents.on(
  //   'did-get-redirect-request',
  //   (event, oldUrl, newUrl) => {
  //     extractResponseFromPage(newUrl, loginWindow);
  //   },
  // );

  loginWindow.loadURL(url);
  loginWindow.webContents.session.clearStorageData({});
});

function extractResponseFromPage(url, loginWindow) {
  console.log(url);
  const javaScript = `
  function getUser() {
    if(document.body.children.length === 1) {
        var pre = document.querySelector('pre');
        return pre ? pre.innerText : false;
    }
	  return false;
   }   
   getUser();`;
  loginWindow.webContents.executeJavaScript(javaScript, result => {
    if (result) {
      mainWindow.webContents.send(`authorized-google-success`, result);
      if (!loginWindow.isDestroyed()) {
        loginWindow.close();
      }
    }
  });
}

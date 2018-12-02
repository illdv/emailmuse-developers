const electron = require('electron');
const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  ipcRenderer,
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
  // log.info(text);
  mainWindow.webContents.send('message', text);
}

let updater;
autoUpdater.autoDownload = false;

autoUpdater.on('update-available', () => {
  sendStatusToWindow('Checking for update...');

  dialog.showMessageBox(
    mainWindow,
    {
      type: 'info',
      title: 'Found Updates',
      message: 'Found updates, do you want update now?',
      buttons: ['Sure', 'No'],
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        autoUpdater.downloadUpdate();
      } else {
        updater = null;
      }
    },
  );
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
  const logMessage = ' - Downloaded ' + Math.floor(progressObj.percent) + '%';
  // logMessage =
  //   logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
  sendStatusToWindow(logMessage);
});

autoUpdater.on('update-downloaded', () => {
  sendStatusToWindow('Update downloaded');

  dialog.showMessageBox(
    mainWindow,
    {
      title: 'Install Updates',
      message: 'Updates downloaded, application will be quit for update...',
      buttons: ['Reset', 'No'],
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        autoUpdater.quitAndInstall();
      }
    },
  );
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function dialogWarningClose(window) {
  window.on('close', e => {
    const warningClose = dialog.showMessageBox(window, {
      type: 'warning',
      message:
        'Аpplication update is running, you are sure you want to close it?',
      defaultId: 1,
      buttons: ['Yes', 'No'],
    });
    if (warningClose === 1) {
      e.preventDefault();
    }
  });
}

app.on('ready', () => {
  createWindow();
  if (process.platform === 'darwin') {
    createMenuForMac();
  }
  if (isProduction) {
    autoUpdater.checkForUpdates();
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

function authorizedGoogle() {
  ipcMain.on('authorized-google', (e, url) => {
    const loginWindow = new BrowserWindow({
      webPreferences: { nodeIntegration: false },
      parent: mainWindow,
      modal: true,
      show: false,
    });
    loginWindow.show();
    loginWindow.loadURL(url);
    const ses = mainWindow.webContents.session;
    // loginWindow.webContents.on('will-navigate', (event, newUrl) => {
    //   extractResponseFromPage(newUrl, loginWindow);
    // });

    ses.webRequest.onBeforeRequest({ urls: [] }, (details, callback) => {
      if (!details.url.includes('app.emailmuse.com')) {
        extractResponseFromPage(details.url, loginWindow);
      }
      callback({});
    });

    // loginWindow.webContents.on(
    //   'did-get-redirect-request',
    //   (event, oldUrl, newUrl) => {
    //     // console.log(newUrl);

    //     extractResponseFromPage(newUrl, loginWindow);
    //   },
    // );
    ses.clearStorageData({});
  });

  function extractResponseFromPage(url, loginWindow) {
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
        loginWindow.hide();
      }
    });
  }
}

authorizedGoogle();

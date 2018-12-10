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
const isDev = require('electron-is-dev');
const authorizedGoogle = require('./authGoogle');
// const ProgressBar = require('electron-progressbar');

let mainWindow = null;
let progressСycle = null;

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width - 500,
    height: height - 200,
    title: 'EmailMuse',
    center: true,
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:8080');
  } else {
    const loadUrl = urlFormat.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file:',
      slashes: true,
    });
    mainWindow.loadURL(loadUrl);
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
  mainWindow.webContents.send('update message', text);
}

autoUpdater.autoDownload = false;

autoUpdater.on('checking-for-update', () => {
  sendStatusToWindow('Checking for update...');
});
autoUpdater.on('update-available', info => {
  sendStatusToWindow('Update available.');

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
        mainWindow.on('close', dialogWarningClose);
        sendStatusToWindow('update is loading');
        let counter = 0;
        progressСycle = setInterval(() => {
          if (counter < 1) {
            counter += 0.1;
          } else {
            counter = 0.1;
          }
          mainWindow.setProgressBar(counter);
        }, 500);
      }
    },
  );
});
autoUpdater.on('update-not-available', info => {
  sendStatusToWindow('Update not available.');
});

autoUpdater.on('update-downloaded', () => {
  sendStatusToWindow('Update downloaded');
  mainWindow.removeListener('close', dialogWarningClose);

  clearInterval(progressСycle);
  mainWindow.setProgressBar(-1);
  dialog.showMessageBox(
    mainWindow,
    {
      title: 'Install Updates',
      message: 'Updates downloaded, application will be quit for update...',
      buttons: ['Reset', 'No'],
    },
    buttonIndex => {
      if (buttonIndex === 0) {
        setImmediate(() => {
          app.removeAllListeners('window-all-closed');
          if (mainWindow != null) {
            mainWindow.close();
          }
          autoUpdater.quitAndInstall(false);
        });
      }
    },
  );
});

autoUpdater.on('error', err => {
  sendStatusToWindow('Error in auto-updater. ' + err);
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

function dialogWarningClose(e) {
  const warningClose = dialog.showMessageBox(mainWindow, {
    type: 'warning',
    message:
      'Аpplication update is running, you are sure you want to close it?',
    defaultId: 1,
    buttons: ['Yes', 'No'],
  });
  if (warningClose === 1) {
    e.preventDefault();
  }
  if (warningClose === 0) {
    clearInterval(progressСycle);
  }
}

app.on('ready', () => {
  createWindow();

  ipcMain.on('authorized-google', (e, url) => {
    authorizedGoogle(url, mainWindow);
  });

  if (process.platform === 'darwin') {
    createMenuForMac();
  }
  if (!isDev) {
    setTimeout(() => autoUpdater.checkForUpdates(), 2000);
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

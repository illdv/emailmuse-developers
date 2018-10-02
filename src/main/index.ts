const electron  = require('electron');
const {
        app,
        BrowserWindow,
        Menu,
        ipcMain,
        shell,
        autoUpdater, dialog
      }         = require('electron');
const path      = require('path');
const urlFormat = require('url');

let mainWindow;
setInterval(() => {
  autoUpdater.checkForUpdates();
}, 60000);

let isProduction    = false;
const UPDATE_SERVER = 'https://bitbucket.org/surefirejb/email-writer-frontend';

try {
  isProduction = IS_PRODUCTION;
} catch (e) {
  console.log('Failed get IS_PRODUCTION in Electron!');
}

if (isProduction && UPDATE_SERVER) {
 /* const autoUpdateTime = 600000; // 1 hour
  const feed           = `${UPDATE_SERVER}/update/${process.platform}/${app.getVersion()}`;
  autoUpdater.setFeedURL({ url: feed });

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, autoUpdateTime);

  autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
    const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
    }

    dialog.showMessageBox(dialogOpts, (response) => {
      if (response === 0) autoUpdater.quitAndInstall()
    })
  })*/
}

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow              = new BrowserWindow({
    width: width - 500,
    height: height - 200,
    title: 'Emailer',
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
    const loadDevTool = require('electron-load-devtool');
    loadDevTool(loadDevTool.REDUX_DEVTOOLS);
    loadDevTool(loadDevTool.REACT_DEVELOPER_TOOLS);
    mainWindow.toggleDevTools();
  }

  mainWindow.webContents.on('will-navigate', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
  // mainWindow.webContents.session.clearStorageData();
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

const url                                  = require('url');
const path2                                = require('path');
const loadDevTool                          = require('electron-load-devtool');
const { app, Menu, BrowserWindow }      = require('electron');
let mainWindow: any;

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 800,
      height: 650,
      title: 'Emailer',
    });

  const loadUrl = url.format({
    pathname: path2.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
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

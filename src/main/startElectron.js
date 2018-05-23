var url = require('url');
var path2 = require('path');
var loadDevTool = require('electron-load-devtool');
var _a = require('electron'), app = _a.app, ipcMain = _a.ipcMain, BrowserWindow = _a.BrowserWindow;
var mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 650,
        title: 'Emailer'
    });
    var loadUrl = url.format({
        pathname: path2.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    });
    // mainWindow.loadURL(loadUrl);
    mainWindow.loadURL('http://localhost:3000');
    loadDevTool(loadDevTool.REDUX_DEVTOOLS);
    loadDevTool(loadDevTool.REACT_DEVELOPER_TOOLS);
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}
app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});
app.on('ready', createWindow);
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

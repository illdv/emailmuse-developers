const url = require('url');
const path2 = require('path');
const { app, ipcMain, BrowserWindow } = require('electron');
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 650,
    });
    const loadUrl = url.format({
        pathname: path2.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(loadUrl);
    //mainWindow.loadURL('http://localhost:3000');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.toggleDevTools();
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
//# sourceMappingURL=startElectron.js.map
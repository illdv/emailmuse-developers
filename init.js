const url = require('url');
const path2 = require('path');
const { app, BrowserWindow, Menu } = require('electron');
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 650,
        title: "Emailer",
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

    // mainWindow.toggleDevTools();
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
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {role: 'cut'},
                {role: 'copy'},
                {role: 'paste'},
                {role: 'pasteandmatchstyle'},
                {role: 'delete'},
                {role: 'selectall'},
            ],
        },
    ]))
}
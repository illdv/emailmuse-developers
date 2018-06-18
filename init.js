const url = require('url');
const path = require('path');
const { app, BrowserWindow, Menu, shell } = require('electron');
const electron = require('electron')
let mainWindow;
function createWindow() {
    const {width, height} = electron.screen.getPrimaryDisplay().workAreaSize
    mainWindow = new BrowserWindow({
        width: width - 500,
        height: height - 200,
        title: "Emailer",
    });
    const loadUrl = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(loadUrl);
    //mainWindow.loadURL('http://localhost:3000');
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.webContents.on('will-navigate', (event, url) => {
        event.preventDefault()
        shell.openExternal(url)
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
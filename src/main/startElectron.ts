import { ElectronGoogleAPI } from './API/ElectronGoogleAPI';
import { ElectronEventType, IElectronEvent } from '../common/ElectronEvent';

const url                                  = require('url');
const path2                                = require('path');
const appState: Store                      = require('./store/rootStore').appState;
const loadDevTool                          = require('electron-load-devtool');
const { app, ipcMain, BrowserWindow }      = require('electron');
const { generateAuthUrl, getOauth2Client } = require('./authorized/AuthorizedGoogle');
let mainWindow: any;

function createWindow() {
  mainWindow = new BrowserWindow(
    {
      width: 800,
      height: 650,
    });

  const loadUrl = url.format({
    pathname: path2.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
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

// ======================== Store ========================

ipcMain.on('load-store', () => {
  const store = appState.get('store');
  mainWindow.webContents.send('loading-store', store);
});

ipcMain.on('save-store', (event, store) => {
  appState.set('store', store);
});


// ======================== Google API ========================

let oauth2Client                 = null;
let googleAPI: ElectronGoogleAPI = null;

ipcMain.on('dispatch-event', async (e, event: IElectronEvent) => {
  try {
    await checkAuthorizationInGoogle();
    const payload = event.payload;
    switch (event.type) {
      case ElectronEventType.GET_USER_ID:
        const profile = await googleAPI.loadingProfile();
        dispatchAnswer(event.type, profile.data.emailAddress);
        break;
      case ElectronEventType.GET_MAIL_IDS:
        const listMail = await googleAPI.getListMail(payload);
        dispatchAnswer(event.type, listMail.data);
        break;
      case ElectronEventType.GET_MAIL_BY_IDS:
        const mail = await googleAPI.loadingAllEmail(payload);
        dispatchAnswer(event.type, mail);
        break;
      case ElectronEventType.SEND_MAIL:
        const senMailResponse = await googleAPI.send(payload);
        dispatchAnswer(event.type, senMailResponse.data);
        break;
      case ElectronEventType.CHECK_LOGIN:
        dispatchAnswer(event.type, !!oauth2Client);
        break;
      default:
        dispatchAnswerFailure(event.type, `Failed handle dispatch-event = ${event.type}`);
    }
  } catch (error) {
    dispatchAnswerFailure(event.type, error.toString());
  }
});

function dispatchAnswer(type: ElectronEventType, payload: any) {
  mainWindow.webContents.send(`${type.toString()}-success`, payload);
}

function dispatchAnswerFailure(type: ElectronEventType, error) {
  mainWindow.webContents.send(`${type.toString()}-failure`, error);
}

ipcMain.on('authorized-google', async () => {
  await authorization();
});

async function checkAuthorizationInGoogle() {
  if (oauth2Client) {
    return;
  }
  await authorization();
}

async function authorization() {
  const authUrl     = await generateAuthUrl();
  const loginWindow = new BrowserWindow({ width: 500, height: 600, center: true });
  loginWindow.loadURL(authUrl);
  oauth2Client = await getOauth2Client();
  googleAPI    = new ElectronGoogleAPI(oauth2Client);
  loginWindow.close();
}

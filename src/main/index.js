const electron = require("electron");
const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  shell,
  dialog,
} = require("electron");
const path = require("path");
const urlFormat = require("url");
const loadDevTool = require("electron-load-devtool");
const isDev = require("electron-is-dev");
const authorizedGoogle = require("./authGoogle");
const updater = require("./updater");

let mainWindow = null;

function createWindow() {
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize;
  mainWindow = new BrowserWindow({
    width: width - 500,
    height: height - 200,
    title: "EmailMuse",
    center: true,
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:8080");
    loadDevTool(loadDevTool.REDUX_DEVTOOLS);
    loadDevTool(loadDevTool.REACT_DEVELOPER_TOOLS);
    mainWindow.toggleDevTools();
  } else {
    const loadUrl = urlFormat.format({
      pathname: path.join(__dirname, "./index.html"),
      protocol: "file:",
      slashes: true,
    });
    mainWindow.loadURL(loadUrl);
  }

  mainWindow.webContents.on("will-navigate", (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
}

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on("ready", () => {
  createWindow();

  ipcMain.on("authorized-google", (e, url) => {
    authorizedGoogle(url, mainWindow);
  });

  if (process.platform === "darwin") {
    createMenuForMac();
  }
  if (!isDev) {
    updater(mainWindow);
  }
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function createMenuForMac() {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: "Edit",
        submenu: [
          { role: "undo" },
          { role: "redo" },
          { type: "separator" },
          { role: "cut" },
          { role: "copy" },
          { role: "paste" },
          { role: "pasteandmatchstyle" },
          { role: "delete" },
          { role: "selectall" },
        ],
      },
    ]),
  );
}

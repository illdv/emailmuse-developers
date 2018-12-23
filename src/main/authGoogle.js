const { BrowserWindow } = require("electron");

let loginWindow = null;
module.exports = function authorizedGoogle(url, window) {
  loginWindow = new BrowserWindow({
    webPreferences: { nodeIntegration: false },
    parent: window,
    modal: true,
    show: true,
  });
  loginWindow.loadURL(url);
  const ses = window.webContents.session;
  // loginWindow.webContents.on('will-navigate', (event, newUrl) => {
  //   extractResponseFromPage(newUrl, loginWindow);
  // });

  ses.webRequest.onBeforeRequest({ urls: [] }, (details, callback) => {
    if (!details.url.includes("app.emailmuse.com")) {
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
    if (loginWindow) {
      loginWindow.webContents.executeJavaScript(javaScript, result => {
        if (result) {
          window.webContents.send(`authorized-google-success`, result);
          loginWindow.hide();
        }
      });
    }
  }
  loginWindow.on("close", () => (loginWindow = null));
};

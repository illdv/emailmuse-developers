const { autoUpdater } = require("electron-updater");
const { app, dialog } = require("electron");
const log = require("electron-log");

module.exports = function updater(window) {
  setTimeout(() => autoUpdater.checkForUpdates(), 2000);
  let progressСycle = null;

  autoUpdater.logger = log;
  autoUpdater.logger.transports.file.level = "info";
  log.info("App starting...");

  function sendStatusToWindow(text) {
    log.info(text);
    window.webContents.send("update message", text);
  }

  autoUpdater.autoDownload = false;

  autoUpdater.on("checking-for-update", () => {
    sendStatusToWindow("Checking for update...");
  });
  autoUpdater.on("update-available", info => {
    sendStatusToWindow("Update available.");

    dialog.showMessageBox(
      window,
      {
        type: "info",
        title: "Found Updates",
        message: "A software update is available. Do you want to update now?",
        buttons: ["Yes", "No"],
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          autoUpdater.downloadUpdate();
          window.on("close", dialogWarningClose);
          sendStatusToWindow("update is loading");
          let counter = 0;
          progressСycle = setInterval(() => {
            if (counter < 1) {
              counter += 0.1;
            } else {
              counter = 0.1;
            }
            window.setProgressBar(counter);
          }, 500);
        }
      },
    );
  });
  autoUpdater.on("update-not-available", info => {
    sendStatusToWindow("Update not available.");
  });

  autoUpdater.on("update-downloaded", () => {
    sendStatusToWindow("Update downloaded");
    window.removeListener("close", dialogWarningClose);

    clearInterval(progressСycle);
    window.setProgressBar(-1);
    dialog.showMessageBox(
      window,
      {
        title: "Install Updates",
        message:
          "Your software has been updated! " +
          "Please restart EmailMuse to load the latest updates.",
        buttons: ["Restart", "No"],
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          setImmediate(() => {
            app.removeAllListeners("window-all-closed");
            if (window != null) {
              window.close();
            }
            autoUpdater.quitAndInstall(false);
          });
        }
      },
    );
  });

  autoUpdater.on("error", err => {
    sendStatusToWindow("Error in auto-updater. " + err);
  });

  function dialogWarningClose(e) {
    const warningClose = dialog.showMessageBox(window, {
      type: "warning",
      message:
        "App updating process is running. Do you want cancel updating and close app?",
      defaultId: 1,
      buttons: ["Yes", "No"],
    });
    if (warningClose === 1) {
      e.preventDefault();
    }
    if (warningClose === 0) {
      clearInterval(progressСycle);
    }
  }
};

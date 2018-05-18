"use strict";
exports.__esModule = true;
var path = require("path");
var electron = require("electron");
var log4js_1 = require("log4js");
var shared_1 = require("./shared");
exports.Level = shared_1.Level;
exports.Cause = shared_1.Cause;
var pathToLogs = (electron.app || electron.remote.app).getPath('userData');
var getPathWithNameJsonFile = function (filename) { return path.join(pathToLogs, filename + '.json'); };
log4js_1.configure({
    appenders: {
        out: {
            type: 'stdout',
            level: shared_1.Level.Trace
        },
        render: {
            type: 'file',
            maxLogSize: 10485760,
            filename: getPathWithNameJsonFile('render')
        },
        electron: {
            type: 'file',
            maxLogSize: 10485760,
            filename: getPathWithNameJsonFile('electron')
        },
        errorFile: {
            type: 'file',
            maxLogSize: 10485760,
            filename: getPathWithNameJsonFile('errors')
        },
        errors: {
            level: shared_1.Level.Error,
            appender: 'errorFile',
            type: 'logLevelFilter'
        }
    },
    categories: (_a = {},
        _a[shared_1.Cause.Default] = { appenders: ['out', 'errors'], level: shared_1.Level.Trace },
        _a[shared_1.Cause.Render] = { appenders: ['out', 'render', 'errors'], level: shared_1.Level.Trace },
        _a[shared_1.Cause.Electron] = { appenders: ['out', 'electron', 'errors'], level: shared_1.Level.Trace },
        _a)
});
var Logger;
(function (Logger) {
    var _LOGGERS = (_a = {},
        _a[shared_1.Cause.Render] = log4js_1.getLogger(shared_1.Cause.Render),
        _a[shared_1.Cause.Default] = log4js_1.getLogger(shared_1.Cause.Default),
        _a[shared_1.Cause.Electron] = log4js_1.getLogger(shared_1.Cause.Electron),
        _a);
    function writeLog(log) {
        var level = log.level, cause = log.cause, message = log.message, info = log.info, error = log.error;
        var logger = _LOGGERS[cause];
        // refactor
        logger[level](log.message, { info: info, error: error });
    }
    Logger.writeLog = writeLog;
    electron.ipcMain.on('log', function (event, log) {
        writeLog(log);
    });
    var _a;
})(Logger || (Logger = {}));
exports["default"] = Logger;
var _a;

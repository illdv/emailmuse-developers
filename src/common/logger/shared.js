"use strict";
exports.__esModule = true;
var Level;
(function (Level) {
    Level["Trace"] = "trace";
    Level["Debug"] = "debug";
    Level["Info"] = "info";
    Level["Warn"] = "warn";
    Level["Error"] = "error";
    Level["Fatal"] = "fatal";
})(Level = exports.Level || (exports.Level = {}));
var Cause;
(function (Cause) {
    Cause["Electron"] = "electron";
    Cause["Render"] = "render";
    Cause["Default"] = "default";
})(Cause = exports.Cause || (exports.Cause = {}));
exports.levelsOrder = [Level.Trace, Level.Debug, Level.Info, Level.Warn, Level.Error, Level.Fatal];

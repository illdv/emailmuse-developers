"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
exports.__esModule = true;
var ElectronGoogleAPI_1 = require("./API/ElectronGoogleAPI");
var ElectronEvent_1 = require("../common/ElectronEvent");
var url = require('url');
var path2 = require('path');
var appState = require('./store/rootStore').appState;
var loadDevTool = require('electron-load-devtool');
var _a = require('electron'), app = _a.app, ipcMain = _a.ipcMain, BrowserWindow = _a.BrowserWindow;
var _b = require('./authorized/AuthorizedGoogle'), generateAuthUrl = _b.generateAuthUrl, getOauth2Client = _b.getOauth2Client;
var mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 650
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
// ======================== Store ========================
ipcMain.on('load-store', function () {
    var store = appState.get('store');
    mainWindow.webContents.send('loading-store', store);
});
ipcMain.on('save-store', function (event, store) {
    appState.set('store', store);
});
// ======================== Google API ========================
var oauth2Client = null;
var googleAPI = null;
ipcMain.on('dispatch-event', function (e, event) { return __awaiter(_this, void 0, void 0, function () {
    var payload, _a, profile, listMail, mail, senMailResponse, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 13, , 14]);
                return [4 /*yield*/, checkAuthorizationInGoogle()];
            case 1:
                _b.sent();
                payload = event.payload;
                _a = event.type;
                switch (_a) {
                    case ElectronEvent_1.ElectronEventType.GET_USER_ID: return [3 /*break*/, 2];
                    case ElectronEvent_1.ElectronEventType.GET_MAIL_IDS: return [3 /*break*/, 4];
                    case ElectronEvent_1.ElectronEventType.GET_MAIL_BY_IDS: return [3 /*break*/, 6];
                    case ElectronEvent_1.ElectronEventType.SEND_MAIL: return [3 /*break*/, 8];
                    case ElectronEvent_1.ElectronEventType.CHECK_LOGIN: return [3 /*break*/, 10];
                }
                return [3 /*break*/, 11];
            case 2: return [4 /*yield*/, googleAPI.loadingProfile()];
            case 3:
                profile = _b.sent();
                dispatchAnswer(event.type, profile.data.emailAddress);
                return [3 /*break*/, 12];
            case 4: return [4 /*yield*/, googleAPI.getListMail(payload)];
            case 5:
                listMail = _b.sent();
                dispatchAnswer(event.type, listMail.data);
                return [3 /*break*/, 12];
            case 6: return [4 /*yield*/, googleAPI.loadingAllEmail(payload)];
            case 7:
                mail = _b.sent();
                dispatchAnswer(event.type, mail);
                return [3 /*break*/, 12];
            case 8: return [4 /*yield*/, googleAPI.send(payload)];
            case 9:
                senMailResponse = _b.sent();
                dispatchAnswer(event.type, senMailResponse.data);
                return [3 /*break*/, 12];
            case 10:
                dispatchAnswer(event.type, !!oauth2Client);
                return [3 /*break*/, 12];
            case 11:
                dispatchAnswerFailure(event.type, "Failed handle dispatch-event = " + event.type);
                _b.label = 12;
            case 12: return [3 /*break*/, 14];
            case 13:
                error_1 = _b.sent();
                dispatchAnswerFailure(event.type, error_1.toString());
                return [3 /*break*/, 14];
            case 14: return [2 /*return*/];
        }
    });
}); });
function dispatchAnswer(type, payload) {
    mainWindow.webContents.send(type.toString() + "-success", payload);
}
function dispatchAnswerFailure(type, error) {
    mainWindow.webContents.send(type.toString() + "-failure", error);
}
ipcMain.on('authorized-google', function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, authorization()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
function checkAuthorizationInGoogle() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (oauth2Client) {
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, authorization()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function authorization() {
    return __awaiter(this, void 0, void 0, function () {
        var authUrl, loginWindow;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, generateAuthUrl()];
                case 1:
                    authUrl = _a.sent();
                    loginWindow = new BrowserWindow({ width: 500, height: 600, center: true });
                    loginWindow.loadURL(authUrl);
                    return [4 /*yield*/, getOauth2Client()];
                case 2:
                    oauth2Client = _a.sent();
                    googleAPI = new ElectronGoogleAPI_1.ElectronGoogleAPI(oauth2Client);
                    loginWindow.close();
                    return [2 /*return*/];
            }
        });
    });
}

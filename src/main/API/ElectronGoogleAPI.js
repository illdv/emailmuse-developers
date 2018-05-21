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
exports.__esModule = true;
var js_base64_1 = require("js-base64");
var moment = require("moment");
var googleapis_1 = require("googleapis");
var uniqid = require('uniqid');
var ElectronGoogleAPI = /** @class */ (function () {
    function ElectronGoogleAPI(oAuth2Client) {
        this.gmail = googleapis_1.google.gmail({
            version: 'v1',
            auth: oAuth2Client
        });
    }
    ElectronGoogleAPI.prototype.loadingProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.gmail.users.getProfile({ userId: 'me' })];
            });
        });
    };
    ElectronGoogleAPI.prototype.getListMail = function (_a) {
        var userId = _a.userId;
        return this.gmail.users.messages.list({
            userId: userId,
            'q': 'label:INBOX OR label:SENT OR label:TRASH OR label:SPAM'
        });
    };
    ElectronGoogleAPI.prototype.loadingAllEmail = function (_a) {
        var _this = this;
        var userId = _a.userId, emailIds = _a.emailIds;
        if (emailIds && emailIds.length === 0) {
            return Promise.all([]);
        }
        var listPromise = [];
        emailIds.forEach(function (emailId) {
            var mail = _this.getMail(userId, emailId.id);
            mail.then((function (value) { return (value.data); }));
            listPromise.push(mail);
        });
        return Promise.all(listPromise);
    };
    /**
     * Send mail.
     * @param {string} to Who will receive the message. Example: Steve <Steve@gmail.com>
     * @param {string} from Who sends the message. Example: Smith <Smith@gmail.com>
     * @param {string} subject Title messages.
     * @param {string} messages mail body.
     */
    ElectronGoogleAPI.prototype.send = function (_a) {
        var to = _a.to, from = _a.from, subject = _a.subject, messages = _a.messages;
        return __awaiter(this, void 0, void 0, function () {
            var raw;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        raw = this.createRaw(to, from, subject);
                        return [4 /*yield*/, this.gmail.users.messages.send({
                                userId: 'me',
                                requestBody: {
                                    raw: js_base64_1.Base64.encodeURI(raw + messages)
                                }
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    ElectronGoogleAPI.prototype.getMail = function (userId, emailId) {
        return this.gmail.users.messages.get({
            userId: userId,
            id: emailId,
            format: 'full'
        });
    };
    ;
    /**
     * Create parameter for attribute raw in mail request.
     */
    ElectronGoogleAPI.prototype.createParameter = function (name, value) {
        return name + ": " + value + "\r\n";
    };
    /**
     * Create raw for request send mail.
     * @param {string} to Who will receive the message. Example: Steve <Steve@gmail.com>
     * @param {string} from Who sends the message. Example: Smith <Smith@gmail.com>
     * @param {string} subject Title messages.
     */
    ElectronGoogleAPI.prototype.createRaw = function (to, from, subject) {
        return [
            "" + this.createParameter('To', to),
            "" + this.createParameter('From', from),
            "" + this.createParameter('Subject', subject),
            "" + this.createParameter('Date', moment().toString()),
            "" + this.createParameter('Content-Type', 'text/html; charset=utf-8'),
            "" + this.createParameter('Content-Transfer-Encoding', 'quoted-printable'),
            "" + this.createParameter('Message-ID', uniqid('emailer_')),
        ].join('');
    };
    return ElectronGoogleAPI;
}());
exports.ElectronGoogleAPI = ElectronGoogleAPI;

"use strict";
exports.__esModule = true;
var Store = require('./Store');
exports.appState = new Store({
    configName: 'appState',
    defaults: {
        store: {}
    }
});
module.exports = { appState: exports.appState };

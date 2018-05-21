var electron = require('electron');
var fs = require('fs');
var path = require('path');
/**
 * Use for save and load data in format JSON.
 */
var Store = /** @class */ (function () {
    function Store(opts) {
        var userDataPath = (electron.app || electron.remote.app).getPath('userData');
        this.path = path.join(userDataPath, opts.configName + '.json');
        this.data = Store.parseDataFile(this.path, opts.defaults);
    }
    Store.parseDataFile = function (filePath, defaults) {
        try {
            return JSON.parse(fs.readFileSync(filePath));
        }
        catch (error) {
            return defaults;
        }
    };
    Store.prototype.get = function (key) {
        return this.data[key];
    };
    Store.prototype.set = function (key, val) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    };
    return Store;
}());
module.exports = Store;

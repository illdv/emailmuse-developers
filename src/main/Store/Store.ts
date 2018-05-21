const electron = require('electron');
const fs       = require('fs');
const path     = require('path');

/**
 * Use for save and load data in format JSON.
 */
class Store {
  private static parseDataFile(filePath, defaults) {
    try {
      return JSON.parse(fs.readFileSync(filePath));
    } catch (error) {
      return defaults;
    }
  }

  private readonly path: string;
  private readonly data: object;

  constructor(opts: { configName: string, defaults: object }) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path          = path.join(userDataPath, opts.configName + '.json');
    this.data          = Store.parseDataFile(this.path, opts.defaults);
  }

  get(key): object {
    return this.data[key];
  }

  set(key: string, val: object) {
    this.data[key] = val;
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}

module.exports = Store;
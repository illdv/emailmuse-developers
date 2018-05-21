const Store = require('./Store');


export const appState = new Store({
  configName: 'appState',
  defaults: {
    store: {},
  }
});

module.exports = {appState};
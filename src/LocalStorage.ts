const { ipcRenderer } = (window as any).require('electron');

const loadStore = async () => {
  ipcRenderer.send('load-store');
  return await new Promise(resolve => {
    ipcRenderer.on('loading-store', (event, value) => {
      resolve(value);
    });
  });
};

const saveStore = (store) => {
  ipcRenderer.send('save-store', store);
};

export { loadStore, saveStore };
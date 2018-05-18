import { IElectronEvent } from '../common/ElectronEvent';

const { ipcRenderer } = (window as any).require('electron');

export namespace UtilsElectron {
  export async function dispatchEvent(event: IElectronEvent) {
    ipcRenderer.send('dispatch-event', event);

    const key = event.type.toString();
    console.log(`getData ${key}`);
    return await new Promise((resolve, reject) => {
      ipcRenderer.on(`${key}-success`, (e, value) => {
        console.log(`${`${key}-success`} - ${value}`);
        resolve(value);
      });
      ipcRenderer.on(`${key}-failure`, (e, value) => {
        console.error(`${`${key}-failure`} - ${value}`);
        reject(value);
      });
    });
  }
}
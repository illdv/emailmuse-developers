const { ipcRenderer } = (window as any).require('electron');

import { Level, Cause, ILog } from './shared';

namespace Logger {
  export function writeLog(log: ILog) {
    ipcRenderer.send('log', log);
  }
}

export { Level, Cause, ILog };

export default Logger;

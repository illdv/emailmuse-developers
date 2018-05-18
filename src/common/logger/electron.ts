import * as fs from 'fs';
import * as path from 'path';
import * as electron from 'electron';
import { getLogger, configure, Layout } from 'log4js';

import {  ILog, Level, Cause } from './shared';

/* Block configs */
const IS_PRODUCTION = false;
const DISPLAYED_LOG_LEVEL = Level.Trace;


const pathToLogs = (electron.app || electron.remote.app).getPath('userData');
const getPathWithNameJsonFile = (filename: string): string => path.join(pathToLogs, filename + '.json');

configure({
    appenders: {
        out: {
            type: 'stdout',
            level: Level.Trace
        },
        render: {
            type: 'file',
            maxLogSize: 10485760,
            filename: getPathWithNameJsonFile('render')
        },
        electron: {
            type: 'file',
            maxLogSize: 10485760,
            filename: getPathWithNameJsonFile('electron')
        },
        errorFile: {
            type: 'file',
            maxLogSize: 10485760,
            filename: getPathWithNameJsonFile('errors')
        },
        errors: {
            level: Level.Error,
            appender: 'errorFile',
            type: 'logLevelFilter'
        }
    },
    categories: {
        [Cause.Default]: { appenders: ['out', 'errors'], level: Level.Trace },
        [Cause.Render]: { appenders: ['out', 'render', 'errors'], level: Level.Trace },
        [Cause.Electron]: { appenders: ['out', 'electron', 'errors'], level: Level.Trace },
    }
});

namespace Logger {
    const _LOGGERS = {
        [Cause.Render]: getLogger(Cause.Render),
        [Cause.Default]: getLogger(Cause.Default),
        [Cause.Electron]: getLogger(Cause.Electron)
    };

    const logFileName = getPathWithNameJsonFile('logs');

    const promiseFileLogArray = ((): Promise<any> => {
        if (fs.existsSync(logFileName)) {
            return new Promise(resolve => {
                fs.readFile(logFileName, 'utf-8', (err, content) => {
                    if (err){
                        return resolve([]);
                    }
                    return resolve(JSON.parse(content).logs);
                });
            });
            
        } else {
            return Promise.resolve([]);
        }
    }); // Loading file

    const promiseFileSaveLog = (log: ILog) => {
        // some
    };
    
    export function writeLog(log: ILog) {
        const {level, cause, message, info, error} = log;
        const logger = _LOGGERS[cause];

        if (!IS_PRODUCTION) {
            logger[level](log.message, { info, error });
        }

        
    }

    electron.ipcMain.on('log', (event, log) => {
        writeLog(log);
    });
}

export {
    ILog,
    Level,
    Cause
};

export default Logger;

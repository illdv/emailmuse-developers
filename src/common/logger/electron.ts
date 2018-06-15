import * as fs from 'fs';
import * as path from 'path';
import moment from 'moment-es6';
import * as electron from 'electron';
import { getLogger, configure, Layout } from 'log4js';

import {  ILog, IJsonLogFormat, Level, Cause, levelsOrder } from './shared';

/* Block configs */
const LOG_STORAGE_PERIOD_UNIX = 60 * 60 * 24 * 7;
const IS_PRODUCTION = false;
const SEND_LOG_LEVEL = Level.Trace;
const sendLogLavelIndex = levelsOrder.indexOf(SEND_LOG_LEVEL);

const pathToLogs = (electron.app || electron.remote.app).getPath('userData');
const getPathWithNameJsonFile = (filename: string): string => path.join(pathToLogs, filename + '.json');

configure({
    appenders: {
        out: {
            type: 'stdout',
            level: Level.Trace,
        },
    },
    categories: {
        [Cause.Render]: { appenders: ['out'], level: Level.Trace },
        [Cause.Default]: { appenders: ['out'], level: Level.Trace },
        [Cause.Electron]: { appenders: ['out'], level: Level.Trace },
    },
});

namespace Logger {
    const customFieldsInfo = {};
    const loggers = {
        [Cause.Render]: getLogger(Cause.Render),
        [Cause.Default]: getLogger(Cause.Default),
        [Cause.Electron]: getLogger(Cause.Electron)
    };
    const logFileName = getPathWithNameJsonFile('logs');

    const setLogsForFile = (logs: IJsonLogFormat[]): string => JSON.stringify({ logs });

    const selectLogsFromFile = (file: string): IJsonLogFormat[] => JSON.parse(file).logs || [];

    const filterLogsByUnixTime = (logs: IJsonLogFormat[], unix: number): IJsonLogFormat[] =>
        logs.filter((log: IJsonLogFormat) => log.data.created > unix);

    const convertILogToJsonFormat = (log: ILog): IJsonLogFormat => ({
        sent: false,
        data: {
            created: moment().unix(),
            level: log.level,
            cause: log.cause,
            message: log.message,
            info: { ...customFieldsInfo, ...log.info },
            error: log.error
        }
    });

    /* Priority functions */
    const originalPromiseLogsObject = new Promise((resolve) => {
        if (fs.existsSync(logFileName)) {
            fs.readFile(logFileName, 'utf-8', (err, content) => {
                if (err) {
                    resolve([]);
                } else {
                    const logs = selectLogsFromFile(content);
                    const period = moment().unix() - LOG_STORAGE_PERIOD_UNIX;
                    const filtered = filterLogsByUnixTime(logs, period);
                    resolve(filtered);
                }
            });
        } else {
            resolve([]);
        }
    });

    let queueThen = originalPromiseLogsObject;

    const setLogs = (logs: IJsonLogFormat[]) =>
        queueThen = queueThen
            .then((arr: IJsonLogFormat[]) => ([ ...arr, ...logs ]));

    const saveToFile = () =>
        queueThen = queueThen
            .then((logs: IJsonLogFormat[]) => new Promise((resolve) => 
                fs.writeFile(logFileName, setLogsForFile(logs), 'utf-8', err => {
                    if (err) {
                        loggers[Cause.Electron].error('Error save log');
                        return resolve([]);
                    } else {
                        return resolve(logs);
                    }
                })
            ));

    /* Public singleton methods */
    export function writeLog(log: ILog) {
        const { level, cause, message, info, error } = log;
        const logger = loggers[cause];
        const jsonLogFormat: IJsonLogFormat = convertILogToJsonFormat(log);

        if (!IS_PRODUCTION) {
            logger[level](log.message, { info, error });
        }

        setLogs([jsonLogFormat])
            .then((arr: IJsonLogFormat[]) => {
                saveToFile();
            });
    }

    export function setCustomFieldToInfo(key: string, value: any) {
        customFieldsInfo[key] = value;
    }

    export function deleteCustomFieldInInfo(key) {
        delete customFieldsInfo[key];
    }

    export function clearLogs() {
        queueThen = Promise.resolve([]);
    }

    export function removeOlderLogs(unix: number) {
        queueThen.then((logs: IJsonLogFormat[]) => {
            queueThen = Promise.resolve(filterLogsByUnixTime(logs, unix));
        });
    }

    /* The method of waiting for an event from the render */
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

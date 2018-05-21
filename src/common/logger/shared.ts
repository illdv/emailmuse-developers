export enum Level {
    Trace = 'trace',
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
    Fatal = 'fatal'
}

export enum Cause {
    Electron = 'electron',
    Render = 'render',
    Default = 'default'
}

export interface ILog {
    level:   Level;
    cause:   Cause;
    message: string;
    info:    object;
    error?:  object|null;
}

export interface IJsonLogFormat {
    sent: boolean;
    data: {
        created: number,
        level:   Level;
        cause:   Cause;
        message: string;
        info:    object;
        error?:  object|null;
    };
}

export const levelsOrder = [Level.Trace, Level.Debug, Level.Info, Level.Warn, Level.Error, Level.Fatal];
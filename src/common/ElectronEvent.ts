export enum ElectronEventType {
  GET_USER_ID     = 'GET_USER_ID',
  GET_MAIL_IDS    = 'GET_MAIL_IDS',
  GET_MAIL_BY_IDS = 'GET_MAIL_BY_IDS',
  SEND_MAIL       = 'SEND_MAIL',
  CHECK_LOGIN     = 'CHECK_LOGIN',
}

export interface IElectronEvent {
  type: ElectronEventType;
  payload: any;
}
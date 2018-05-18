import { UtilsElectron } from '../utilsElectron';
import { ElectronEventType } from '../../common/ElectronEvent';


export namespace GoogleAPI {

  export async function loadingUserId() {
    return createEvent(ElectronEventType.GET_USER_ID)
  }

  export async function checkLogin(): Promise<boolean>  {
    return createEvent(ElectronEventType.CHECK_LOGIN)
  }

  export async function loadingMailIds(userId: string) {
    return createEvent(ElectronEventType.GET_MAIL_IDS, { userId })
  }

  export async function loadingMailByIds(userId: string, emailIds: Array<{ id: string }>): Promise<GMail.IMailResponse> {
    return createEvent(ElectronEventType.GET_MAIL_BY_IDS, { userId, emailIds })
  }

  export async function sendMail(to: string, from: string, subject: string, messages: string) {
    return createEvent(ElectronEventType.SEND_MAIL, {to, from, subject, messages});
  }

  function createEvent(eventType: ElectronEventType, payload: any = {}): Promise<any> {
    return UtilsElectron.dispatchEvent({type: eventType, payload})
  }
}

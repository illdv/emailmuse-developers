import { Base64 } from 'js-base64';
import * as moment from 'moment';
import { google, gmail_v1 } from 'googleapis';

const uniqid = require('uniqid');

export class ElectronGoogleAPI {

  private gmail: gmail_v1.Gmail;


  constructor(oAuth2Client) {
    this.gmail = google.gmail({
      version: 'v1',
      auth: oAuth2Client
    });
  }

  async loadingProfile() {
    return this.gmail.users.getProfile({userId: 'me'});
  }

  getListMail({ userId }: { userId: string }): Promise<any> {
    return this.gmail.users.messages.list({
      userId,
      'q': 'label:INBOX OR label:SENT OR label:TRASH OR label:SPAM'
    });
  }

  loadingAllEmail({ userId, emailIds }: { userId: string, emailIds: Array<{ id: string }> }) {
    if (emailIds && emailIds.length === 0) {
      return Promise.all([]);
    }
    const listPromise: Array<Promise<any>> = [];
    emailIds.forEach((emailId) => {
      const mail = this.getMail(userId, emailId.id);
      mail.then((value => (value.data)));
      listPromise.push(mail);
    });
    return Promise.all(listPromise);
  }

  /**
   * Send mail.
   * @param {string} to Who will receive the message. Example: Steve <Steve@gmail.com>
   * @param {string} from Who sends the message. Example: Smith <Smith@gmail.com>
   * @param {string} subject Title messages.
   * @param {string} messages mail body.
   */
  async send({ to, from, subject, messages }: { to: string, from: string, subject: string, messages: string }) {
    const raw = this.createRaw(to, from, subject);
    return await
      this.gmail.users.messages.send({
        userId: 'me',
        requestBody: {
          raw: Base64.encodeURI(raw + messages)
        }
      });
  }

  private getMail(userId: string, emailId: string) {
    return this.gmail.users.messages.get({
      userId,
      id: emailId,
      format: 'full',
    });
  };

  /**
   * Create parameter for attribute raw in mail request.
   */
  private createParameter(name: string, value: string): string {
    return `${name}: ${value}\r\n`;
  }

  /**
   * Create raw for request send mail.
   * @param {string} to Who will receive the message. Example: Steve <Steve@gmail.com>
   * @param {string} from Who sends the message. Example: Smith <Smith@gmail.com>
   * @param {string} subject Title messages.
   */
  private createRaw(to: string, from: string, subject: string) {
    return [
      `${this.createParameter('To', to)}`,
      `${this.createParameter('From', from)}`,
      `${this.createParameter('Subject', subject)}`,
      `${this.createParameter('Date', moment().toString())}`,
      `${this.createParameter('Content-Type', 'text/html; charset=utf-8')}`,
      `${this.createParameter('Content-Transfer-Encoding', 'quoted-printable')}`,
      `${this.createParameter('Message-ID', uniqid('emailer_'))}`,
    ].join('');
  }
}
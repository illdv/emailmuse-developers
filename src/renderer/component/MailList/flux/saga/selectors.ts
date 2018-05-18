import { createSelector } from 'reselect';
import { Base64 } from 'js-base64';
import { findSelectedMail } from 'src/renderer/component/MailEdit/utils';

const getMailResponse = (responses: GMail.IMailResponse) => (responses);
export const getSelectedMail = (state) => (findSelectedMail(state.mail));
export const getUserId  = (state) => (state.accounts.userId);
export const getOldMail = (state) => (state.mail.mailViews);

export interface IMailView {
  id: string;
  subject: string;
  time: string;
  from: string;
  content: string;
  to: string;
  labelsType: LabelsType[];
}

export enum LabelsType {
  INBOX     = 'INBOX',
  SEND_MAIL = 'SENT',
  TRASH     = 'TRASH',
  SPAM      = 'SPAM',
  TEMPLATE  = 'TEMPLATE',
}


const responseSelector = createSelector(
  getMailResponse,
  (responses: any): any => {
    if (responses) {
      return responses.map((value) => (value.data));
    } else {
      return [];
    }
  }
);

export const mailViewSelector = createSelector(
  responseSelector,
  (mailsData: GMail.IMailData[]): IMailView[] => {
    console.log(mailsData);
    return mailsData.map((mailData): IMailView => {
      return {
        id: mailData.id,
        from: extractHeader(mailData, HeadersName.From).value,
        subject: extractHeader(mailData, HeadersName.Subject).value,
        time: extractHeader(mailData, HeadersName.Date).value,
        labelsType: mailData.labelIds as LabelsType[],
        content: getContent(mailData.payload),
        to: '',
      };
    });
  });

function extractHeader(mailData: GMail.IMailData, searchHeader: HeadersName): GMail.IHeader {
  const findHeader = mailData.payload.headers.find((header) =>
    header.name.toLocaleLowerCase() === searchHeader.toLowerCase()
  );

  if (!findHeader) {
    throw new Error('Failed find header = ' + searchHeader);
  }
  return findHeader;
}

function getContent(payload: GMail.IPayload) {
  const content = extractData(payload);

  const encodedBody = content
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .replace(/\s/g, '');

  return Base64.decode(encodedBody);
}

function extractData(payload: GMail.IPayload): string {
  return payload.parts
    && getHTMLPart(payload.parts)
    || payload.body.data;
}

function getHTMLPart(arr): string {
  for (let x = 0; x <= arr.length; x++) {
    if (arr[x].parts) {
      return getHTMLPart(arr[x].parts);
    }
    else {
      if (arr[x].mimeType === 'text/html') {
        return arr[x].body.data;
      }
    }
  }
  return '';
}

/**
 * The names of the mail header.
 */
export enum HeadersName {
  Date    = 'Date',
  Subject = 'Subject',
  From    = 'From',
}


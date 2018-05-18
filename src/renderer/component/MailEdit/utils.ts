import uniqid from 'uniqid';
import * as moment from 'moment';

import { LabelsType, IMailView } from 'src/renderer/component/MailList/flux/saga/selectors';
import { FluxMail } from 'src/renderer/component/MailList/flux/action';

export function findSelectedMail(mail: FluxMail.IState): IMailView {
  const {mailViews, selectedMailId} = mail;

  const selectedMail = mailViews.find((mailView) => mailView.id === selectedMailId);
  if (!selectedMail) {
    throw new Error('Failed find selected mail. selectedMailId = ' + selectedMailId);
  }
  return selectedMail;
}

export function createMail(content: string = '', subject: string = '', from: string = '', to: string = ''): IMailView {
  return {
    id: uniqid('emailer_'),
    content,
    time: moment().toString(),
    labelsType: [LabelsType.SEND_MAIL],
    subject,
    from,
    to,
  };
}
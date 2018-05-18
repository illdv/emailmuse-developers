import * as moment from 'moment';
import { LabelsType, IMailView } from 'src/renderer/component/MailList/flux/saga/selectors';
import { FluxMail, SelectedType } from 'src/renderer/component/MailList/flux/action';

export function extractTime(data: string) {
  const formatTime = 'YYYY-MM-DD';
  const showTime   = moment(data);
  if (showTime.format(formatTime) === moment().format(formatTime)) {
    return showTime.format('HH:MM');
  } else {
    return showTime.format('MMM D');
  }
}

function isHasLabel(labelsType: LabelsType[], find: LabelsType) {
  return labelsType.indexOf(find) !== -1;
}

function isHasLabelAndNotTrash(labelsType: LabelsType[], find: LabelsType) {
  if (isHasLabel(labelsType, LabelsType.TRASH)) {
    return false;
  }
  return isHasLabel(labelsType, find);
}

export function filterVisibilityLabel(mailView: IMailView[], labelsType: LabelsType) {
  if (!mailView) {
    return [];
  }
  if (labelsType === LabelsType.TRASH) {
    return mailView.filter((mail) => isHasLabel(mail.labelsType, LabelsType.TRASH));
  }
  return mailView.filter((mail) => isHasLabelAndNotTrash(mail.labelsType, labelsType));
}

export function sortSelectedMail(mails: IMailView[]): IMailView[] {
  return mails.sort((a, b) => moment(b.time).diff(a.time));
}

export function isMailSelected(mailState: FluxMail.IState, selectedType: SelectedType) {
  return !!mailState.selectedMailId && mailState.selectedType === selectedType;
}

// TODO: need use lodash
/**
 * Use for define need load mail or not.
 */
export function filterAlreadyAvailable(ids: Array<{ id: string }>, mails: IMailView[] | undefined) {
  if (mails && mails.length !== 0) {
    return ids.filter((id) => {
      return !mails.find((mail) => mail.id === id.id);
    });
  }
  return ids;
}
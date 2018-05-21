import { getSelectedMail, getUserId, IMailView } from 'src/renderer/component/MailList/flux/saga/selectors';
import { FluxMail } from 'src/renderer/component/MailList/flux/action';
import { call, put, select, take } from 'redux-saga/effects';
import { GoogleAPI } from 'src/renderer/API/GoogleAPI';

function* sendMail(): IterableIterator<any> {
  const selectedMail: IMailView = yield select(getSelectedMail);
  try {
    const userId = yield select(getUserId);
    yield GoogleAPI.sendMail(selectedMail.to, `${userId} <${userId}>`, selectedMail.subject, selectedMail.content);

    yield put(FluxMail.Actions.sendMail.SUCCESS(selectedMail.id));
  } catch (error) {
    // noinspection TsLint
    console.log(error);
    yield put(FluxMail.Actions.sendMail.FAILURE(error.toString(), selectedMail.id));
  }
}

export function* sendMailSaga(): IterableIterator<any> {
  while (true) {
    yield take(FluxMail.Actions.sendMail.REQUEST('').type);
    yield call(sendMail);
  }
}

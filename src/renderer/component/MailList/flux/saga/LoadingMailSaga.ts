import { call, put, take, select } from 'redux-saga/effects';
import { FluxMail } from 'src/renderer/component/MailList/flux/action';
import {
  getOldMail,
  getUserId,
  IMailView,
  mailViewSelector
} from 'src/renderer/component/MailList/flux/saga/selectors';
import { GoogleAPI } from '../../../../API/GoogleAPI';
import { filterAlreadyAvailable } from 'src/renderer/component/MailList/utils';

function* onLoadingMail(): IterableIterator<any> {
  try {
    const userId = yield select(getUserId);
    const emailIds = yield GoogleAPI.loadingMailIds(userId);

    const ids: Array<{ id: string }> = emailIds.messages;
    const oldMail: IMailView[]       = yield select(getOldMail);
    const filterIds                  = filterAlreadyAvailable(ids, oldMail);

    const mails: GMail.IMailResponse | null = yield GoogleAPI.loadingMailByIds(userId, filterIds);

    const mailViews = mailViewSelector(mails);
    yield put(FluxMail.Actions.loadMail.SUCCESS(mailViews || []));
  } catch (error) {
    // noinspection TsLint
    console.log(error);
    yield put(FluxMail.Actions.loadMail.FAILURE(error));
  }
}

export function* loadingMailSaga(): IterableIterator<any> {
  while (true) {
    yield take(FluxMail.Actions.loadMail.REQUEST().type);
    yield call(onLoadingMail);
  }
}
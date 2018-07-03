import { call, put, take } from 'redux-saga/effects';

import { sendCodeOnMail } from 'src/renderer/API/AuthAPI';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';

function* onSendCodeOnMail(action: { payload: { email: string } }): IterableIterator<any> {
  try {
    yield sendCodeOnMail(action.payload.email);
    yield put(AuthorisationActions.sendCode.SUCCESS({}));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(AuthorisationActions.sendCode.FAILURE({}));
  }
}

export function* sendCodeOnMailSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(AuthorisationActions.sendCode.REQUEST(null).type);
    yield call(onSendCodeOnMail, action);
  }
}

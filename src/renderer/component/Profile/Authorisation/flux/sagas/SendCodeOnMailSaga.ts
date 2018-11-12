import { call, put, take } from 'redux-saga/effects';

import { sendCodeOnMail, sendNewCodeOnMail } from 'src/renderer/API/AuthAPI';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';

function* onSendCodeOnMail(action: {
  payload: { email: string };
}): IterableIterator<any> {
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

function* onSendNewCodeOnMail(action: {
  payload: { email: string };
}): IterableIterator<any> {
  try {
    yield sendNewCodeOnMail(action.payload.email);
    yield put(AuthorisationActions.sendNewCode.SUCCESS({}));
    yield put(
      FluxToast.Actions.showToast('New message was sent', ToastType.Success),
    );
  } catch (error) {
    yield call(errorHandler, error);
    yield put(AuthorisationActions.sendNewCode.FAILURE({}));
  }
}

export function* sendNewCodeOnMailSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(
      AuthorisationActions.sendNewCode.REQUEST(null).type,
    );
    yield call(onSendNewCodeOnMail, action);
  }
}

import { call, put, take } from 'redux-saga/effects';

import { sendCode } from 'src/renderer/API/AuthAPI';
import { AuthStep } from 'src/renderer/component/Profile/Authorisation/flux/models';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';

function* onCreateAccount(action): IterableIterator<any> {
  const requestUser = action.payload.user;
  try {
    yield put(AuthorisationActions.setAuthStep.REQUEST({ authStep: AuthStep.LOADING }));
    yield sendCode(requestUser);
    yield put(AuthorisationActions.createAccount.SUCCESS(requestUser));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(AuthorisationActions.login.FAILURE({}));
  }
}

export function* createAccountSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(AuthorisationActions.createAccount.REQUEST(null).type);
    yield call(onCreateAccount, action);
  }
}

import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Accounts/flux/action';
import { authToken } from 'src/common/hardcoded_token';

function* onLogin(): IterableIterator<any> {
  yield put(FluxAccounts.Actions.login.SUCCESS(authToken));
}

export function* loginSaga(): IterableIterator<any> {
  while (true) {
    yield take(FluxAccounts.Actions.login.REQUEST().type);
    yield call(onLogin);
  }
}

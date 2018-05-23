import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Accounts/flux/action';

function* onLogin(): IterableIterator<any> {
  yield put(FluxAccounts.Actions.login.SUCCESS('mySeperTocen007+'));
}

export function* loginSaga(): IterableIterator<any> {
  while (true) {
    yield take(FluxAccounts.Actions.login.REQUEST().type);
    yield call(onLogin);
  }
}

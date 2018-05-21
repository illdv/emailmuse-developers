import { call, put, take } from 'redux-saga/effects';
import { FluxAuth } from 'src/renderer/component/Auth/flux/action';

function* onLogin(): IterableIterator<any> {
  yield put(FluxAuth.Actions.login.SUCCESS('mySeperTocen007+'));
}

export function* loginSaga(): IterableIterator<any> {
  while (true) {
    yield take(FluxAuth.Actions.login.REQUEST().type);
    yield call(onLogin);
  }
}

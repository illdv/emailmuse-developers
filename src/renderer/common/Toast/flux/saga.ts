import { call, put, take } from 'redux-saga/effects';
import { FluxToast } from 'src/renderer/common/Toast/flux/actions';
import { delay } from 'redux-saga';

function* onSetError(action): IterableIterator<any> {
  yield delay(2000);
  yield put(FluxToast.Actions.clear());
}

export function* toastSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(FluxToast.Actions.showToast().type);
    yield call(onSetError, action);
  }
}

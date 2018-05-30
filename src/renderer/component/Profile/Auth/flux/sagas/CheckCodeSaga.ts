import { call, put, take } from 'redux-saga/effects';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { checkCode } from 'src/renderer/API/Auth';
import { checkCodeActions } from 'src/renderer/component/Profile/Auth/flux/module';

function* onCheckCode(action): IterableIterator<any> {
  try {
    yield checkCode(action.payload.code);
    yield put(checkCodeActions.SUCCESS());
    yield put(FluxToast.Actions.showToast('Account activation successfully', ToastType.Success));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('The code is invalid!', ToastType.Error));
    yield put(checkCodeActions.FAILURE());
  }
}

export function* checkCodeSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(checkCodeActions.type.REQUEST);
    yield call(onCheckCode, action);
  }
}

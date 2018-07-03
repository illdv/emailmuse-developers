import { call, put, take } from 'redux-saga/effects';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { checkCode } from 'src/renderer/API/AuthAPI';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';

function* onCheckCode(action): IterableIterator<any> {
  try {
    yield checkCode(action.payload.code);
    yield put(AuthorisationActions.checkCode.SUCCESS({}));
    yield put(FluxToast.Actions.showToast('Account activation successfully', ToastType.Success));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('The code is invalid!', ToastType.Error));
    yield put(AuthorisationActions.checkCode.FAILURE({}));
  }
}

export function* checkCodeSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(AuthorisationActions.checkCode.REQUEST(null).type);
    yield call(onCheckCode, action);
  }
}

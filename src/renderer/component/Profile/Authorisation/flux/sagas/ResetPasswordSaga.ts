import { call, put, take } from 'redux-saga/effects';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { resetPassword } from 'src/renderer/API/AuthAPI';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';

function* onResetPassword(action): IterableIterator<any> {
  try {
    yield resetPassword(action.payload.request);
    yield put(AuthorisationActions.resetPassword.SUCCESS({}));
    yield put(FluxToast.Actions.showToast('Reset password success.', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(AuthorisationActions.resetPassword.FAILURE({}));
  }
}

export function* resetPasswordSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(AuthorisationActions.resetPassword.REQUEST(null).type);
    yield call(onResetPassword, action);
  }
}

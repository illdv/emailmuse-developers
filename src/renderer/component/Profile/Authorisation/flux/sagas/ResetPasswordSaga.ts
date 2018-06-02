import { call, put, take } from 'redux-saga/effects';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { resetPassword } from 'src/renderer/API/AuthAPI';
import { resetPasswordActions } from 'src/renderer/component/Profile/Authorisation/flux/module';

interface IResetPasswordAction {
  payload: {
    email: string,
    token: string,
    password: string,
    passwordConfirmation: string,
  };
}

function* onResetPassword(action: IResetPasswordAction): IterableIterator<any> {
  try {
    yield resetPassword(action.payload);
    yield put(resetPasswordActions.SUCCESS());
    yield put(FluxToast.Actions.showToast('Reset password success.', ToastType.Success));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Reset password failed.', ToastType.Error));
  }
}

export function* resetPasswordSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(resetPasswordActions.type.REQUEST);
    yield call(onResetPassword, action);
  }
}

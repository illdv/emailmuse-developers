import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';
import { FluxToast, ToastType } from 'src/renderer/component/Toast/flux/actions';
import { resetPassword } from 'src/renderer/API/Auth';

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
    yield put(FluxValidation.Actions.setScheme({ key: 'secret_code', value: { presence: true } }));
    yield resetPassword(action.payload);
    yield put(FluxAccounts.Actions.ForgotPassword.resetPassword.SUCCESS());
    yield put(FluxToast.Actions.showToast('Reset password success.', ToastType.Success));
  } catch (error) {
    yield put(FluxToast.Actions.showToast('Reset password failed.', ToastType.Error));
    yield put(FluxToast.Actions.showToast(error.response.data.message));
  }
}

export function* resetPasswordSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(FluxAccounts.Actions.ForgotPassword.resetPassword.REQUEST().type);
    yield call(onResetPassword, action);
  }
}

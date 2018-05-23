import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { FluxToast, ToastType } from 'src/renderer/component/Toast/flux/actions';

function* onResetPassword(action: {payload: {email: string, token: string, password: string, passwordConfirmation: string}}): IterableIterator<any> {
  try {
    yield put(FluxValidation.Actions.setScheme({key: 'secret_code', value: {presence: true}}));
    yield EmailerAPI.Accounts.resetPassword(action.payload);
    yield put(FluxAccounts.Actions.ForgotPassword.resetPassword.SUCCESS());
    yield put(FluxToast.Actions.showToast('Reset password success.', ToastType.Success));
  } catch(error){
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

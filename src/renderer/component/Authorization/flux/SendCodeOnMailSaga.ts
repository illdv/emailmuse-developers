import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { sendCodeOnMail } from '../../../API/Auth';
import { ValidationActions } from 'src/renderer/common/Validation/flux/module';

function* onSendCodeOnMail(action: { payload: { email: string } }): IterableIterator<any> {
  try {
    yield put(ValidationActions.setScheme({ key: 'secret_code', value: { presence: true } }));
    yield sendCodeOnMail(action.payload.email);
    yield put(FluxAccounts.Actions.ForgotPassword.sendCodeOnMail.SUCCESS());
  } catch (error) {
    yield put(FluxToast.Actions.showToast(error.response.data.message, ToastType.Error));
    yield put(FluxAccounts.Actions.ForgotPassword.sendCodeOnMail.FAILURE());
  }
}

export function* sendCodeOnMailSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(FluxAccounts.Actions.ForgotPassword.sendCodeOnMail.REQUEST().type);
    yield call(onSendCodeOnMail, action);
  }
}

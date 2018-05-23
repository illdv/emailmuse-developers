import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';
import { FluxToast } from 'src/renderer/component/Toast/flux/actions';
import { sendCodeOnMail } from '../../../API/Auth';

function* onSendCodeOnMail(action: { payload: { email: string } }): IterableIterator<any> {
  try {
    yield put(FluxValidation.Actions.setScheme({ key: 'secret_code', value: { presence: true } }));
    yield sendCodeOnMail(action.payload.email);
    yield put(FluxAccounts.Actions.ForgotPassword.sendCodeOnMail.SUCCESS());
  } catch (error) {
    yield put(FluxToast.Actions.showToast(error.response.data.message));
  }
}

export function* sendCodeOnMailSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(FluxAccounts.Actions.ForgotPassword.sendCodeOnMail.REQUEST().type);
    yield call(onSendCodeOnMail, action);
  }
}

import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';

function* onSendCode(action: {payload: {email: string, token: string, password: string, passwordConfirmation: string}}): IterableIterator<any> {
  yield put(FluxValidation.Actions.setScheme({key: 'secret_code', value: {presence: true}}));
  yield EmailerAPI.Accounts.resetPassword(action.payload);
  yield put(FluxAccounts.Actions.ForgotPassword.resetPassword.SUCCESS());
}

export function* sendCodeSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(FluxAccounts.Actions.ForgotPassword.resetPassword.REQUEST().type);
    yield call(onSendCode, action);
  }
}

 import { call, put, take } from 'redux-saga/effects';
 import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
 import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';
 import * as EmailerAPI from 'src/renderer/API/EmailerAPI';

function* onSendCodeOnMail(action: {payload: {email: string}}): IterableIterator<any> {
  yield put(FluxValidation.Actions.setScheme({key: 'secret_code', value: {presence: true}}));
  yield EmailerAPI.Accounts.sendCodeOnMail(action.payload.email);
  yield put(FluxAccounts.Actions.ForgotPassword.sendCodeOnMail.SUCCESS());
}

export function* sendCodeOnMailSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(FluxAccounts.Actions.ForgotPassword.sendCodeOnMail.REQUEST().type);
    yield call(onSendCodeOnMail, action);
  }
}
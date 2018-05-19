import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Accounts/flux/FluxAccounts';
import { EmailerAPI } from 'src/renderer/API/EmailerAPI';
const CreateAccount = FluxAccounts.Actions.CreateAccount;

function* onCreateAccount(action): IterableIterator<any> {
  try {
    const user = yield EmailerAPI.Accounts.createAccount(action.payload.user);
    yield put(CreateAccount.Step.SUCCESS(user));
  } catch (e) {
    console.log(e);
  }
}

export function* createAccountSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(CreateAccount.Step.type.REQUEST);
    yield call(onCreateAccount, action);
  }
}

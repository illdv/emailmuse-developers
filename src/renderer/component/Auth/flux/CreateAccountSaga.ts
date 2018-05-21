import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import { EmailerAPI } from 'src/renderer/API/EmailerAPI';
const actions = FluxAccounts.Actions;
const CreateAccount = actions.CreateAccount;

function* onCreateAccount(action): IterableIterator<any> {
  try {
    yield put(actions.SetAuthStep(FluxAccounts.Models.AuthStep.LOADING));
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

import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { useOrDefault } from 'src/renderer/utils';
const actions = FluxAccounts.Actions;
const CreateAccount = actions.CreateAccount;

function* onCreateAccount(action): IterableIterator<any> {
  const requestUser = action.payload.user;
  try {
    yield put(actions.SetAuthStep(FluxAccounts.Models.AuthStep.LOADING));
    const user = yield EmailerAPI.Accounts.createAccount(requestUser);
    yield put(CreateAccount.Step.SUCCESS(user));
  } catch (error) {
    console.log(error);
    const errorMessages = useOrDefault(() => (error.response.data.errors.email[0]), 'Unknown error');
    yield put(CreateAccount.Step.FAILURE(errorMessages, requestUser));
  }
}

export function* createAccountSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(CreateAccount.Step.type.REQUEST);
    yield call(onCreateAccount, action);
  }
}

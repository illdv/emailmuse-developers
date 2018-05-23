import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import { useOrDefault } from 'src/renderer/utils';
import { FluxToast, ToastType } from 'src/renderer/component/Toast/flux/actions';
import { sendCode } from 'src/renderer/API/Auth';

const actions = FluxAccounts.Actions;
const CreateAccount = actions.CreateAccount;

function* onCreateAccount(action): IterableIterator<any> {
  const requestUser = action.payload.user;
  try {
    yield put(actions.SetAuthStep(FluxAccounts.Models.AuthStep.LOADING));
    yield sendCode(requestUser);
    yield put(CreateAccount.Step.SUCCESS(requestUser));
  } catch (error) {
    console.log(error);
    const errorMessages = useOrDefault(() => (error.response.data.errors.email[0]), 'Unknown error');
    if (error.response && error.response.status) {
      yield put(FluxToast.Actions.showToast(errorMessages, ToastType.Error));
    }
    yield put(CreateAccount.Step.FAILURE(errorMessages, requestUser));
  }
}

export function* createAccountSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(CreateAccount.Step.type.REQUEST);
    yield call(onCreateAccount, action);
  }
}

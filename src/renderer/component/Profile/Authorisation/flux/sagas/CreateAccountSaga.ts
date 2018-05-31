import { call, put, take } from 'redux-saga/effects';
import { useOrDefault } from 'src/renderer/utils';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { sendCode } from 'src/renderer/API/Auth';
import { createAccountActions, setAuthStepAction } from 'src/renderer/component/Profile/Authorisation/flux/module';
import { AuthStep } from 'src/renderer/component/Profile/Authorisation/flux/models';

function* onCreateAccount(action): IterableIterator<any> {
  const requestUser = action.payload.user;
  try {
    yield put(setAuthStepAction(AuthStep.LOADING));
    yield sendCode(requestUser);
    yield put(createAccountActions.SUCCESS(requestUser));
  } catch (error) {
    console.log(error);
    const errorMessages = useOrDefault(() => (error.response.data.errors.email[0]), 'Unknown error');
    if (error.response && error.response.status) {
      yield put(FluxToast.Actions.showToast(errorMessages, ToastType.Error));
    }
    yield put(createAccountActions.FAILURE(errorMessages, requestUser));
  }
}

export function* createAccountSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(createAccountActions.type.REQUEST);
    yield call(onCreateAccount, action);
  }
}

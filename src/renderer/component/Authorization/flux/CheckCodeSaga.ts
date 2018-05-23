import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { FluxToast, ToastType } from 'src/renderer/component/Toast/flux/actions';
import { checkCode } from 'src/renderer/API/Auth';

function* onCheckCode(action): IterableIterator<any> {
  try {
    yield checkCode(action.payload.code);
    yield put(FluxAccounts.Actions.CreateAccount.checkCode.SUCCESS());
    yield put(FluxToast.Actions.showToast('Account activation successfully', ToastType.Success));
  } catch(error) {
    yield put(FluxToast.Actions.showToast('The code is invalid!', ToastType.Error));
    yield put(FluxAccounts.Actions.CreateAccount.checkCode.FAILURE());
  }
}

export function* checkCodeSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(FluxAccounts.Actions.CreateAccount.checkCode.REQUEST('').type);
    yield call(onCheckCode, action);
  }
}

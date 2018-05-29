import { call, put, take } from 'redux-saga/effects';
// import { FluxAccounts } from 'src/renderer/component/Profile/Auth/flux/FluxAccounts';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { sendCodeOnMail } from 'src/renderer/API/Auth';
import { ValidationActions } from 'src/renderer/common/Validation/flux/module';
import { sendCodeOnMailActions } from 'src/renderer/component/Profile/Auth/flux/module';

function* onSendCodeOnMail(action: { payload: { email: string } }): IterableIterator<any> {
  try {
    yield put(ValidationActions.setScheme({ key: 'secret_code', value: { presence: true } }));
    yield sendCodeOnMail(action.payload.email);
    yield put(sendCodeOnMailActions.SUCCESS());
  } catch (error) {
    yield put(FluxToast.Actions.showToast(error.response.data.message, ToastType.Error));
    yield put(sendCodeOnMailActions.FAILURE());
  }
}

export function* sendCodeOnMailSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(sendCodeOnMailActions.type.REQUEST);
    yield call(onSendCodeOnMail, action);
  }
}

import { call, put, take } from 'redux-saga/effects';
import { AccountSpace, IChangePasswordPayload } from 'src/renderer/component/Profile/Account/flux/actions';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { IActionPayload } from 'src/renderer/flux/utils';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';

function* getProfileSaga() {
  try {
    const res = yield call(EmailerAPI.Accounts.getProfile);
    yield put(AccountSpace.Actions.getProfile.SUCCESS({
      name: res.data.name,
      email: res.data.email,
    }));
  } catch (e) {
    console.error(e);
  }
}

function* changePasswordSaga(action: IActionPayload<IChangePasswordPayload>): IterableIterator<any> {
  const data = action.payload;
  try {
    const res = yield call(EmailerAPI.Accounts.changePassword, data);
    yield put(FluxToast.Actions.showToast('Your password has been successfully changed', ToastType.Success));
  } catch (error) {
    console.log(error);
    yield put(FluxToast.Actions.showToast('Failed reset password', ToastType.Error));
  }
}

function* changeNameSaga(action: IActionPayload<{ name: string }>): IterableIterator<any> {
  const data = action.payload;
  try {
    const res = yield call(EmailerAPI.Accounts.changeName, data);
  } catch (error) {
    yield put(FluxToast.Actions.showToast(error.message, ToastType.Success));
  }
  yield put(FluxToast.Actions.showToast('Your indicator has been successfully changed', ToastType.Success));
}

export function* watcherGetProfile() {
  while (true) {
    yield take('GET_PROFILE_REQUEST');
    yield call(getProfileSaga);

  }
}

export function* watcherChangeName() {
  while (true) {
    const data = yield take('CHANGE_NAME_REQUEST');
    yield call(changeNameSaga, data);
  }
}

export function* watcherChangePassword() {
  while (true) {
    const data = yield take('CHANGE_PASSWORD_REQUEST');
    yield call(changePasswordSaga, data);
  }
}

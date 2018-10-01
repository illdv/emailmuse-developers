import { call, put, take } from 'redux-saga/effects';
import { AccountActions } from 'src/renderer/component/Profile/Account/flux/module';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';
import { ProfileAPI } from 'src/renderer/API/EmailerAPI';

function* getProfileSaga() {
  try {
    const response = yield call(ProfileAPI.getProfile);
    yield put(AccountActions.loadingProfile.SUCCESS({user: response.data}));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(AccountActions.loadingProfile.FAILURE({}));
  }
}

export function* watcherGetProfile() {
  while (true) {
    yield take(AccountActions.loadingProfile.REQUEST(null).type);
    yield call(getProfileSaga);
  }
}

function* changePasswordSaga(action): IterableIterator<any> {
  const data = action.payload;
  try {
    yield call(ProfileAPI.changePassword, data);
    yield put(FluxToast.Actions.showToast('Your password has been successfully changed', ToastType.Success));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(AuthorisationActions.login.FAILURE({}));
  }
}

export function* watcherChangePassword() {
  while (true) {
    const data = yield take(AccountActions.changePassword.REQUEST(null).type);
    yield call(changePasswordSaga, data);
  }
}

function* changeNameSaga(action): IterableIterator<any> {
  try {
    const newName = action.payload.name;
    yield call(ProfileAPI.changeName, newName);
    yield put(FluxToast.Actions.showToast('Name change success', ToastType.Success));
    yield put(AccountActions.changeName.SUCCESS({name: newName}));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(AccountActions.changeName.FAILURE({}));
  }
}

export function* watcherName() {
  while (true) {
    const action = yield take(AccountActions.changeName.REQUEST(null).type);
    yield call(changeNameSaga, action);
  }
}

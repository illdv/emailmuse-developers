import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { Action } from 'redux-act';
import { push } from 'react-router-redux';

import { login } from 'src/renderer/API/AuthAPI';
import CustomStorage from 'src/common/CustomStorage';
import { AuthStep, IUser } from 'src/renderer/component/Profile/Authorisation/flux/models';
import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import { ILoginRequest, ILoginResponse } from 'src/renderer/component/Profile/Authorisation/flux/interface';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';
import { PollsActions } from 'src/renderer/component/Profile/Polls/flux/actions';

const { ipcRenderer } = (window as any).require('electron');

function* watcherSetToken() {
  while (true) {
    const action: Action<{ user: IUser }> = yield take(AuthorisationActions.login.SUCCESS(null).type);
    const token                           = action.payload.user.token;

    CustomStorage.setItem('token', token, false);
    // noinspection TsLint
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  }
}

function* watcherLogout() {
  while (true) {
    yield take(AuthorisationActions.logout.REQUEST(null).type);
    CustomStorage.clear();
    // noinspection TsLint
    axios.defaults.headers.common.authorization = ``;
    yield put(push('/login'));
  }
}

function* onLogin(action: Action<{ request: ILoginRequest }>): IterableIterator<any> {
  try {

    yield put(AuthorisationActions.setAuthStep.REQUEST({ authStep: AuthStep.LOADING }));
    const response: AxiosResponse<ILoginResponse> = yield call(login, action.payload.request);
    const user = extractUser(response);
    yield put(AuthorisationActions.login.SUCCESS({ user }));
    // ToDO Add Check If User is new
    yield put(PollsActions.getPoll.REQUEST({}));
    // ToDO Add show Loader
    yield take(PollsActions.getPoll.SUCCESS);
    yield put(push('/polls'));

    // redirect to main page

    // yield put(push('/emails'));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(AuthorisationActions.login.FAILURE({}));
  }
}

function* getAccessToken() {
  const response = yield AxiosWrapper.get('/google/auth/redirect-url');
  ipcRenderer.send('authorized-google', response.data.url);
  return yield call(getToken);
}

function* onGoogleLogin(): IterableIterator<any> {
  try {

    const token = yield call(getAccessToken);

    const user = extractUser({ data: JSON.parse(token) } as any);

    yield put(AuthorisationActions.login.SUCCESS({ user }));
    yield put(push('/emails'));

  } catch (error) {
    yield call(errorHandler, error);
    yield put(AuthorisationActions.login.FAILURE({}));
  }
}

function* loginSaga(): IterableIterator<any> {

  yield all([
    takeEvery(AuthorisationActions.login.REQUEST(null).type, onLogin),
    takeEvery(AuthorisationActions.loginInGoogle.REQUEST(null).type, onGoogleLogin),
  ]);
}

function getToken() {
  return new Promise((resolve, reject) => {
    ipcRenderer.on('authorized-google-success', (event, value) => {
      resolve(value);
    });
  });
}

function extractUser(response: AxiosResponse<ILoginResponse>) {
  const { user, token } = response.data;
  return { email: user.email, name: user.name, token };
}

export default [loginSaga, watcherLogout, watcherSetToken];

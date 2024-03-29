import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { Action } from 'redux-act';
import { push } from 'react-router-redux';

import { login } from 'src/renderer/API/AuthAPI';
import CustomStorage from 'src/common/CustomStorage';
import {
  AuthStep,
  IUser,
} from 'src/renderer/component/Profile/Authorisation/flux/models';
import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import {
  ILoginRequest,
  ILoginResponse,
} from 'src/renderer/component/Profile/Authorisation/flux/interface';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { errorHandler } from 'src/renderer/flux/saga/errorHandler';
import { pollsFlow } from 'src/renderer/component/Profile/Polls/flux/saga';
import { FolderActions } from 'src/renderer/component/Folder/flux/actions';
import { AccountActions } from 'src/renderer/component/Profile/Account/flux/module';
import checkFirstTimeStorage from 'src/common/checkFirstTimeStorage';
import { isFirstTime } from 'src/renderer/common/isFirstTime';
import { SnippetsAction } from 'src/renderer/component/Snippets/flux/actions';

const { ipcRenderer } = (window as any).require('electron');

function* watcherSetToken() {
  while (true) {
    const action: Action<{ user: IUser }> = yield take(
      AuthorisationActions.login.SUCCESS(null).type,
    );

    const token = action.payload.user.token;
    const time = Date.now();
    CustomStorage.setItemWithTimer({
      key: 'token',
      value: token,
      isRemembered: true,
      time,
    });
    // noinspection TsLint
    axios.defaults.headers.common.authorization = `Bearer ${token}`;
  }
}

function* watcherLogout() {
  while (true) {
    yield take(AuthorisationActions.logout.REQUEST(null).type);
    CustomStorage.clearToken();
    // noinspection TsLint
    axios.defaults.headers.common.authorization = ``;
    yield put(push('/login'));
  }
}

function* watcherInitApp() {
  const oneDay: number = 86_400_000;

  while (true) {
    yield take(AuthorisationActions.initializeApp.REQUEST(null).type);
    yield call(checkFirstTimeStorage);
    yield put(
      AuthorisationActions.firstTime.REQUEST({ firstTime: isFirstTime() }),
    );
    if (localStorage.getItem('token')) {
      if (
        Date.now() - parseInt(localStorage.getItem('time_token'), 10) <
        30 * oneDay
      ) {
        yield put(
          AuthorisationActions.setAuthStep.REQUEST({
            authStep: AuthStep.LOADING,
          }),
        );
        const token = localStorage.getItem('token');
        axios.defaults.headers.common.authorization = `Bearer ${token}`;
        yield put(AccountActions.loadingProfile.REQUEST({}));
        yield take(AccountActions.loadingProfile.SUCCESS(null).type);
        yield put(FolderActions.openFolder.REQUEST({}));

        localStorage.setItem('time_token', String(Date.now()));
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('time_token', String(Date.now()));
      } else {
        sessionStorage.clear();
        localStorage.clear();
      }
    }
  }
}

function* onLogin(
  action: Action<{ request: ILoginRequest }>,
): IterableIterator<any> {
  try {
    yield call(() => checkFirstTimeStorage('remove'));
    yield put(
      AuthorisationActions.firstTime.REQUEST({ firstTime: isFirstTime() }),
    );
    yield put(
      AuthorisationActions.setAuthStep.REQUEST({ authStep: AuthStep.LOADING }),
    );
    const response: AxiosResponse<ILoginResponse> = yield call(
      login,
      action.payload.request,
    );
    const user = extractUser(response);
    yield put(AuthorisationActions.login.SUCCESS({ user }));

    // Check If User is new
    if (user.passed_poll === false) {
      yield call(pollsFlow);
    }
    // redirect to main page

    yield put(SnippetsAction.loading.REQUEST({}));
    yield put(push('/snippets'));
  } catch (error) {
    const status = error.response.status;
    yield call(errorHandler, error);
    yield put(AuthorisationActions.login.FAILURE({ status }));
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

    yield call(() => checkFirstTimeStorage('remove'));
    yield put(
      AuthorisationActions.firstTime.REQUEST({ firstTime: isFirstTime() }),
    );
    if (user.passed_poll === false) {
      yield call(pollsFlow);
    }
    yield put(FolderActions.openFolder.REQUEST({}));
  } catch (error) {
    yield call(errorHandler, error);
    yield put(AuthorisationActions.login.FAILURE({}));
  }
}

function* loginSaga(): IterableIterator<any> {
  yield all([
    takeEvery(AuthorisationActions.login.REQUEST(null).type, onLogin),
    takeEvery(
      AuthorisationActions.loginInGoogle.REQUEST(null).type,
      onGoogleLogin,
    ),
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
  return { ...user, token };
}

export default [loginSaga, watcherLogout, watcherSetToken, watcherInitApp];

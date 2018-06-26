import { all, call, put, take, takeEvery } from 'redux-saga/effects';
import { IActionPayload } from 'src/renderer/flux/utils';
import axios, { AxiosResponse } from 'axios';
import { ILoginResponse } from 'type/EmailerAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { login, oAuthGoogle } from 'src/renderer/API/AuthAPI';
import CustomStorage from 'src/common/CustomStorage';
import {
  ILoginRequest,
  loginActions,
  loginSetToken,
  setAuthStepAction,
} from 'src/renderer/component/Profile/Authorisation/flux/module';
import { AuthStep } from 'src/renderer/component/Profile/Authorisation/flux/models';
import { OAuthActions } from 'src/renderer/component/Profile/Authorisation/flux/googleOAuth';

export function* watcherSetToken() {
  while (true) {
    const { payload } = yield take('SET_TOKEN');
    CustomStorage.setItem('token', payload.token, false);
    // noinspection TsLint
    axios.defaults.headers.common['authorization'] = `Bearer ${payload.token}`;
  }
}

export function* watcherLogout() {
  while (true) {
    yield take('LOGOUT');
    CustomStorage.clear();
    // noinspection TsLint
    axios.defaults.headers.common['authorization'] = ``;
  }
}

function* onLogin(action: IActionPayload<{ request: ILoginRequest }>): IterableIterator<any> {
  try {
    yield put(setAuthStepAction(AuthStep.LOADING));
    const response: AxiosResponse<ILoginResponse> = yield login(action.payload.request);
    const { user, token } = response.data;
    yield put(loginSetToken(token));
    yield put(loginActions.SUCCESS({ email: user.email, name: user.name, token }));
  } catch (error) {
    yield put(loginActions.FAILURE(''));
    if (error.response === undefined) {
      yield put(FluxToast.Actions.showToast(error.message, ToastType.Error));
    } else {
      if (error.response && error.response.status) {
        yield put(FluxToast.Actions.showToast(error.response.data.message, ToastType.Error));
      }
    }
    yield put(loginActions.FAILURE(''));
  }
}

function* onGoogleLogin(): IterableIterator<any> {
  const googleRequest = yield take(OAuthActions.loginInGoogle.SUCCESS(null).type);
  try {
    const authResponse: AxiosResponse<ILoginResponse> = yield call(
      oAuthGoogle, googleRequest.payload.accessToken,
    );
    const { user, token } = authResponse.data;
    yield put(loginSetToken(token));
    yield put(loginActions.SUCCESS({ email: user.email, name: user.name, token }));
  } catch (error) {
    yield put(loginActions.FAILURE(''));
    if (error.response === undefined) {
      yield put(FluxToast.Actions.showToast(error.message, ToastType.Error));
    } else {
      if (error.response && error.response.status) {
        yield put(FluxToast.Actions.showToast(error.response.data.message, ToastType.Error));
      }
    }
    yield put(loginActions.FAILURE(''));
  }
}

export function* loginSaga(): IterableIterator<any> {

  yield all([
    takeEvery(loginActions.type.REQUEST, onLogin),
    takeEvery(OAuthActions.loginInGoogle.REQUEST(null).type, onGoogleLogin),
  ]);
}

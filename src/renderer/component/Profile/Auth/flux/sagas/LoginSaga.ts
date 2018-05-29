import { call, put, take } from 'redux-saga/effects';
import { IActionPayload } from 'src/renderer/flux/utils';
import axios, { AxiosResponse } from 'axios';
import { ILoginResponse } from 'type/EmailerAPI';
import { FluxToast, ToastType } from 'src/renderer/common/Toast/flux/actions';
import { login } from 'src/renderer/API/Auth';
import CustomStorage from 'src/common/CustomStorage';
import {
  ILoginRequest,
  loginActions,
  loginSetToken,
  setAuthStepAction,
} from 'src/renderer/component/Profile/Auth/flux/module';
import { AuthStep } from 'src/renderer/component/Profile/Auth/flux/models';

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
    const { user, token }                        = response.data;
    yield put(loginSetToken(token));
    yield put(loginActions.SUCCESS({ email: user.email, name: user.name, token }));
  } catch (error) {
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
  while (true) {
    const action = yield take(loginActions.type.REQUEST);
    yield call(onLogin, action);
  }
}

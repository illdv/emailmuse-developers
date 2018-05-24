import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { IActionPayload } from 'src/renderer/flux/utils';
import axios, { AxiosResponse } from 'axios';
import { ILoginResponse } from 'type/EmailerAPI';
import CustomStorage from '../../../../common/CustomStorage';
import { FluxToast, ToastType } from 'src/renderer/component/Toast/flux/actions';
import { login } from 'src/renderer/API/Auth';
import IRequest = FluxAccounts.Actions.Login.IRequest;

const actions      = FluxAccounts.Actions;
const LoginAccount = actions.Login;

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

function* onLogin(action: IActionPayload<{ request: IRequest }>): IterableIterator<any> {
  try {
    yield put(actions.SetAuthStep(FluxAccounts.Models.AuthStep.LOADING));

    const request: AxiosResponse<ILoginResponse> = yield login(action.payload.request);
    const { user, token }                        = request.data;
    yield put(LoginAccount.SetToken(token));
    yield put(LoginAccount.Step.SUCCESS({ email: user.email, name: user.name, token }));
  } catch (error) {
    if (error.response === undefined) {
      yield put(FluxToast.Actions.showToast(error.message, ToastType.Error));
    } else {
      if (error.response && error.response.status) {
        yield put(FluxToast.Actions.showToast(error.response.data.message, ToastType.Error));
      }
    }
    yield put(LoginAccount.Step.FAILURE(''));
  }
}

export function* loginSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(LoginAccount.Step.type.REQUEST);
    yield call(onLogin, action);
  }
}

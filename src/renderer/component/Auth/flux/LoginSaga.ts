import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { IActionPayload } from 'src/renderer/flux/utils';
import IRequest = FluxAccounts.Actions.Login.IRequest;
import axios, { AxiosResponse } from 'axios';
import { ILoginResponse } from 'type/EmailerAPI';
import CustomStorage from '../../../../common/CustomStorage';
import { FluxToast } from 'src/renderer/component/Toast/flux/actions';

const actions      = FluxAccounts.Actions;
const LoginAccount = actions.Login;

export function* watcherSetToken() {
  while (true) {
    const { payload } = yield take('SET_TOKEN');
    CustomStorage.setItem('token', payload.token, false);
    axios.defaults.headers.common['authorization'] = `Bearer ${payload.token}`;
  }
}

function* onLogin(action: IActionPayload<{ request: IRequest }>): IterableIterator<any> {
  try {
    yield put(actions.SetAuthStep(FluxAccounts.Models.AuthStep.LOADING));
    const request: AxiosResponse<ILoginResponse> = yield EmailerAPI.Accounts.login(action.payload.request);
    const name = request.data.user.name;
    const email = request.data.user.email;
    const token = request.data.token;
    yield put(LoginAccount.SetToken(token));
    yield put(LoginAccount.Step.SUCCESS({ email, user: name, token }));
  } catch (error) {
    if (error.response.status === 400) {
      yield put(FluxToast.Actions.setError(error.response.data.message));
    }
    yield put(LoginAccount.Step.FAILURE(error));
  }
}

export function* loginSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(LoginAccount.Step.type.REQUEST);
    yield call(onLogin, action);
  }
}

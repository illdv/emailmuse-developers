import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import  * as EmailerAPI  from 'src/renderer/API/EmailerAPI';
import { IActionPayload } from 'src/renderer/flux/utils';
import IRequest = FluxAccounts.Actions.Login.IRequest;
import { AxiosResponse } from 'axios';
import { ILoginResponse } from 'type/EmailerAPI';

const actions      = FluxAccounts.Actions;
const LoginAccount = actions.Login;

function* onLogin(action: IActionPayload<{ request: IRequest }>): IterableIterator<any> {
  try {
    yield put(actions.SetAuthStep(FluxAccounts.Models.AuthStep.LOADING));
    const request: AxiosResponse<ILoginResponse> = yield EmailerAPI.Accounts.login(action.payload.request);
    yield put(LoginAccount.Step.SUCCESS({ token: request.data.token, email: '', user: '' }));
  } catch (e) {
    console.log(e);
  }
}

export function* loginSaga(): IterableIterator<any> {
  while (true) {
    const action = yield take(LoginAccount.Step.type.REQUEST);
    yield call(onLogin, action);
  }
}

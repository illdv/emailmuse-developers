import { call, put, take } from 'redux-saga/effects';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import * as EmailerAPI from 'src/renderer/API/EmailerAPI';
import { IActionPayload } from 'src/renderer/flux/utils';
import IRequest = FluxAccounts.Actions.Login.IRequest;
import { AxiosResponse } from 'axios';
import { ILoginResponse } from 'type/EmailerAPI';
import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';
import { FluxToast } from 'src/renderer/component/Toast/flux/actions';

const actions      = FluxAccounts.Actions;
const LoginAccount = actions.Login;

function* onLogin(action: IActionPayload<{ request: IRequest }>): IterableIterator<any> {
  try {
    yield put(actions.SetAuthStep(FluxAccounts.Models.AuthStep.LOADING));
    const request: AxiosResponse<ILoginResponse> = yield EmailerAPI.Accounts.login(action.payload.request);
    yield put(LoginAccount.Step.SUCCESS({ token: request.data.token, email: '', user: '' }));
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

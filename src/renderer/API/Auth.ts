import { ILoginResponse } from 'type/EmailerAPI';
import { Axios } from 'src/renderer/API/Axios';
import { AxiosPromise } from 'axios';
import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';

export function login(request: FluxAccounts.Actions.Login.IRequest): AxiosPromise<ILoginResponse> {
  return Axios.post('/login', request);
}

export function checkCode(code: string) {
  return Axios.post(`/register/confirm/${code}`, {});
}

export function sendCode(user: FluxAccounts.Actions.CreateAccount.IRequest) {
  return Axios.post('/register', user);
}

export function sendCodeOnMail(email: string) {
  return Axios.post('/password/email', { email });
}
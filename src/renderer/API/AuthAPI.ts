import { ILoginResponse } from 'type/EmailerAPI';
import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import { AxiosPromise } from 'axios';
import { ICreateAccountRequest, ILoginRequest } from 'src/renderer/component/Profile/Authorisation/flux/interface';

export function login(request: ILoginRequest): AxiosPromise<ILoginResponse> {
  return AxiosWrapper.post('/login', request);
}

export function checkCode(code: string) {
  return AxiosWrapper.post(`/register/confirm/${code}`, {});
}

export function sendCode(user: ICreateAccountRequest) {
  return AxiosWrapper.post('/register', user);
}

export function sendCodeOnMail(email: string) {
  return AxiosWrapper.post('/password/email', { email });
}

export function oAuthGoogle(token: string) {
  return AxiosWrapper.get('/google/auth', {token} );
}
// TODO: move in Authorisation module
interface IResetPasswordRequest {
  email: string;
  token: string;
  password: string;
  passwordConfirmation: string;
}

export function resetPassword({ email, token, password, passwordConfirmation }: IResetPasswordRequest) {
  return AxiosWrapper.post('/password/reset', { email, token, password, password_confirmation: passwordConfirmation });
}

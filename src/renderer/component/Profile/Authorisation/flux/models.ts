/**
 * Possible authorization steps.
 */
export enum AuthStep {
  LOGIN                = 'LOGIN',
  REGISTRATION         = 'REGISTRATION',
  CHECK_CODE           = 'CHECK_CODE',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  FORGOT_PASSWORD      = 'FORGOT_PASSWORD',
  LOADING              = 'LOADING',
}

export interface IUser {
  name: string;
  email: string;
  token: string;
  passed_poll: boolean;
  has_email: boolean;
  has_snippet: boolean;
}

export interface IAuthState {
  user: IUser;
  authStep: AuthStep;
  error: string;
}

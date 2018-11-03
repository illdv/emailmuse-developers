/**
 * Possible authorization steps.
 */
export enum AuthStep {
  LOGIN = 'LOGIN',
  PRE_LOGIN = 'PRE_LOGIN',
  LOGIN_WITH_EMAIL = 'LOGIN_WITH_EMAIL',
  PRE_SIGN_UP = 'PRE_SIGN_UP',
  REGISTRATION = 'REGISTRATION',
  CHECK_CODE = 'CHECK_CODE',
  REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  LOADING = 'LOADING',
}

export interface IUser {
  name: string;
  email: string;
  token: string;
  passed_poll: boolean;
  has_email: boolean;
  has_snippet: boolean;
  is_swipe_locked: boolean;
}

export interface IAuthState {
  user: IUser;
  authStep: AuthStep;
  error: string;
  email?: string;
  status?: number;
  password?: string;
  password_confirmation?: string;
}

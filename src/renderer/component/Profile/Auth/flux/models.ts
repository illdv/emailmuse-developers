/**
 * Possible authorization steps.
 */
export enum AuthStep {
  LOGIN                  = 'LOGIN',
  CREATE_ACCOUNT         = 'CREATE_ACCOUNT',
  CHECK_CODE             = 'CHECK_CODE',
  CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS',
  FORGOT_PASSWORD        = 'FORGOT_PASSWORD',
  LOADING                = 'LOADING',
}

export interface IUser {
  name: string;
  email: string;
  token: string;
}

export interface IAuthState {
  user: IUser;
  authStep: AuthStep;
  error: string;
}

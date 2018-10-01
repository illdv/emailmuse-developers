import { createActionGenerator } from 'src/renderer/flux/utils';
import {
  ICreateAccountRequest,
  ILoginRequest,
  IResetPasswordRequest,
} from 'src/renderer/component/Profile/Authorisation/flux/interface';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { AuthStep, IUser } from 'src/renderer/component/Profile/Authorisation/flux/models';

const createAsyncAction = createActionGenerator('AUTHORISATION');

const setToken      = createAsyncAction('SET_TOKEN');
const login         = createAsyncAction('LOGIN_ACCOUNT');
const createAccount = createAsyncAction('CREATE_ACCOUNT');
const checkCode     = createAsyncAction('CHECK_CODE');
const resetPassword = createAsyncAction('RESET_PASSWORD');
const setAuthStep   = createAsyncAction('SET_AUTH_STEP');
const logout        = createAsyncAction('LOGOUT');
const loginInGoogle = createAsyncAction('LOGIN_IN_GOOGLE');
const sendCode      = createAsyncAction('SEND_CODE');
const sendNewCode   = createAsyncAction('SEND_NEW_CODE');

export const AuthorisationActions: IAuthorisationActions = {
  setToken,
  login,
  createAccount,
  checkCode,
  resetPassword,
  setAuthStep,
  logout,
  loginInGoogle,
  sendCode,
  sendNewCode,
};

export interface IAuthorisationActions {
  setToken: IAsyncAction2<{ token: string }, {}>;
  login: IAsyncAction2<{ request: ILoginRequest }, { user: IUser }>;
  createAccount: IAsyncAction2<{ user: ICreateAccountRequest }, { user: IUser }>;
  checkCode: IAsyncAction2<{ code: string }, {}>;
  resetPassword: IAsyncAction2<{ request: IResetPasswordRequest }, {}>;
  setAuthStep: IAsyncAction2<{ authStep: AuthStep }, {}>;
  sendCode: IAsyncAction2<{ email: string }, {}>;
  sendNewCode: IAsyncAction2<{ email: string }, {}>;
  logout: IAsyncAction2<{}, {}>;
  loginInGoogle: IAsyncAction2<{}, {}>;
}

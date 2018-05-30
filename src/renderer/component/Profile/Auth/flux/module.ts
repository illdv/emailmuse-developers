import { createAction, handleActions } from 'redux-actions';
import { createActionSteps, IActionPayload, IActionSteps } from 'src/renderer/flux/utils';
import axios from 'axios';
import { AuthStep, IAuthState, IUser } from 'src/renderer/component/Profile/Auth/flux/models';
import CustomStorage from 'src/common/CustomStorage';
import { Action } from 'redux';

/**
 * Login
 */
export interface ILoginRequest {
  mail: string;
  password: string;
}

export type ILoginSetToken = (token: string) => IActionPayload<{ token: string }>;

export const loginSetToken: ILoginSetToken = createAction('SET_TOKEN',
  (token: ILoginRequest) => ({ token }),
);

export interface ILoginActions extends IActionSteps {
  REQUEST: (request: ILoginRequest) => IActionPayload<{ request: ILoginRequest }>;
  SUCCESS: (user: IUser) => IActionPayload<{ user: IUser }>;
  FAILURE: (error) => IActionPayload<{ error: string }>;
}

export const loginActions: ILoginActions = createActionSteps('LOGIN_ACCOUNT',
  (request: ILoginRequest) => ({ request }),
  (user: IUser) => ({ user }),
  (error: string) => ({ error }),
);

/**
 * Create account
 */
export interface ICreateAccountRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface ICreateAccountActions extends IActionSteps {
  REQUEST: (user: ICreateAccountRequest) => IActionPayload<{ user: ICreateAccountRequest }>;
  SUCCESS: (user: IUser) => IActionPayload<{ user: IUser }>;
  FAILURE: (error: string, request: ICreateAccountRequest) =>
    IActionPayload<{ error: string, request: ICreateAccountRequest }>;
}

export const createAccountActions: ICreateAccountActions = createActionSteps('CREATE_ACCOUNT',
  (user: ICreateAccountRequest) => ({ user }),
  (user: IUser) => ({ user }),
  (error: string, request: ICreateAccountRequest) => ({ error, request }),
);

export const checkCodeActions = createActionSteps('CHECK_CODE',
  (code: string) => ({ code }),
  () => ({}),
  (error: string) => ({ error }),
);

/**
 * Reset password
 */
export const sendCodeOnMailActions = createActionSteps('SEND_CODE',
  (email: string) => ({ email }),
  () => ({}),
  (error: string) => ({ error }),
);
export const resetPasswordActions  = createActionSteps('RESET_PASSWORD',
  (email: string, token: string, password: string, passwordConfirmation: string) => ({
    email,
    token,
    password,
    passwordConfirmation,
  }),
  () => ({}),
  (error: string) => ({ error }),
);

type TSetAuthStep = (authStep: AuthStep) => Action;

export const setAuthStepAction: TSetAuthStep = createAction('SET_AUTH_STEP',
  (authStep: AuthStep) => ({ authStep }));

/**
 * Logout
 */
export const logoutAction = createAction('LOGOUT');

const createDefaultAuthState = (token?: string): IAuthState => {
  // noinspection TsLint
  axios.defaults.headers.common.authorization = `Bearer ${token}`;
  return {
    user: { email: '', name: '', token: token ? token : '' },
    error: '',
    authStep: AuthStep.LOGIN,
  };
};

export const authReducer = handleActions({
  [loginActions.type.SUCCESS]: (state: IAuthState, action: IActionPayload<{ user: IUser }>): IAuthState => {
    return { ...state, ...action.payload };
  },
  [loginActions.type.FAILURE]: (state, action): IAuthState => {
    return { ...state, ...action.payload, authStep: AuthStep.LOGIN };
  },
  [createAccountActions.type.SUCCESS]: (state: IAuthState, action): IAuthState => {
    return { ...state, ...action.payload, authStep: AuthStep.CHECK_CODE };
  },
  [createAccountActions.type.FAILURE]: (state, action): IAuthState => {
    return { ...state, ...action.payload, authStep: AuthStep.CREATE_ACCOUNT };
  },
  [checkCodeActions.type.SUCCESS]: (state): IAuthState => {
    return { ...state, authStep: AuthStep.LOGIN };
  },
  [resetPasswordActions.type.SUCCESS]: (state): IAuthState => {
    return { ...state, authStep: AuthStep.LOGIN };
  },
  GET_PROFILE_SUCCESS: (state, action) => {
    return { ...state, user: { ...state.user, ...action.payload } };
  },
  SET_AUTH_STEP: (state, action) => {
    return { ...state, ...action.payload };
  },
  LOGOUT: (state): IAuthState => {
    return createDefaultAuthState();
  },
}, createDefaultAuthState(CustomStorage.getItem('token')));

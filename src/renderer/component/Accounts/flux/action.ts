import { handleActions, createAction } from 'redux-actions';
import { Action } from 'redux';
import { FluxDrawerMenu } from 'src/renderer/component/Menu/flux/action';
import IActionsPayload = FluxDrawerMenu.IActionsPayload;
import { IActionPayload } from 'src/renderer/flux/utils';


const SET_AUTH_STEP = 'SET_AUTH_STEP';

const login = {
  REQUEST: createAction('LOGIN_ACCOUNT_REQUEST'),
  SUCCESS: createAction('LOGIN_ACCOUNT_SUCCESS', (token: string) => ({ token })),
  FAILURE: createAction('LOGIN_ACCOUNT_FAILURE', () => ({})),
};

export interface ICreateAccountModel {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserModel {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ICreateAccount{
  REQUEST: (user: ICreateAccountModel) => IActionPayload<{user: ICreateAccountModel}>;
  SUCCESS: (user: IUserModel) => IActionPayload<{user: IUserModel}>;
  FAILURE: (error: string) => IActionPayload<{error: string}>;
}

const createAccount = {
  REQUEST: createAction('CREATE_ACCOUNT_REQUEST', (user: ICreateAccountModel) => ({ user })),
  SUCCESS: createAction('CREATE_ACCOUNT_SUCCESS', (user: IUserModel) => ({ user })),
  FAILURE: createAction('CREATE_ACCOUNT_FAILURE', (error: string) => ({error})),
};

interface IActionLogin {
  REQUEST: () => Action;
  SUCCESS: (token: string) => Action;
  FAILURE: () => Action;
}

const setAuthStep = createAction(SET_AUTH_STEP, (authStep: AuthStep) => ({ authStep }));

/**
 * Possible step authorisation.
 */
export enum AuthStep {
  LOGIN           = 'LOGIN',
  CREATE_ACCOUNT  = 'CREATE_ACCOUNT',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

const createDefaultState = (): FluxAccounts.IState => {
  return {
    userId: '',
    error: '',
    authStep: AuthStep.LOGIN,
    token: '',
  };
};

const reducerAccounts = handleActions({
  [login.SUCCESS().type]: (state, action) => {
    return { ...state, ...action.payload };
  },
  [login.FAILURE().type]: (state, action) => {
    return { ...state, ...action.payload };
  },
  SET_AUTH_STEP: (state, action) => {
    return { ...state, ...action.payload };
  },
}, createDefaultState());


export namespace FluxAccounts {
  interface IActions {
    createAccount: ICreateAccount;
    login: IActionLogin;
    setAuthStep: (authStep: AuthStep) => Action;
  }

  export const Actions: IActions = {
    createAccount,
    login,
    setAuthStep,
  };

  export interface IState {
    userId: string;
    error: string;
    token: string;
    authStep: AuthStep;
  }

  export const reducer = reducerAccounts;
}
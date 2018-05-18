import { handleActions, createAction } from 'redux-actions';
import { Action } from 'redux';


const SET_AUTH_STEP = 'SET_AUTH_STEP';

const login = {
  REQUEST: createAction('LOGIN_ACCOUNT_REQUEST'),
  SUCCESS: createAction('LOGIN_ACCOUNT_SUCCESS', (token: string) => ({ token })),
  FAILURE: createAction('LOGIN_ACCOUNT_FAILURE', () => ({})),
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
    login: IActionLogin;
    setAuthStep: (authStep: AuthStep) => Action;
  }

  export const Actions: IActions = {
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
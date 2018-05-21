import { handleActions, createAction } from 'redux-actions';
import { Action } from 'redux';

import { IActionPayload, IActionSteps } from 'src/renderer/flux/utils';
import { createActionSteps } from '../../../flux/utils';
import CustomStorage from '../../../../common/CustomStorage';
import axios from 'axios';
export namespace FluxAccounts {
  export namespace Models {
    /**
     * Possible step authorisation.
     */
    export enum AuthStep {
      LOGIN                  = 'LOGIN',
      CREATE_ACCOUNT         = 'CREATE_ACCOUNT',
      CREATE_ACCOUNT_SUCCESS = 'CREATE_ACCOUNT_SUCCESS',
      FORGOT_PASSWORD        = 'FORGOT_PASSWORD',
      LOADING                = 'LOADING',
    }

    export interface IUser {
      user: string;
      email: string;
      token: string;
    }
  }

  export namespace Actions {
    export namespace Login {

      export interface IRequest {
        mail: string;
        password: string;
      }
      export type ISetToken = (token:string) => IActionPayload<{token:string}>;
      
      export const SetToken: ISetToken = createAction('SET_TOKEN',
        (token: IRequest) => ({ token }),
      );
      export interface IActions extends IActionSteps {
        REQUEST: (request: IRequest) => IActionPayload<{ request: IRequest }>;
        SUCCESS: (user: Models.IUser) => IActionPayload<{ user: Models.IUser }>;
        FAILURE: (error) => IActionPayload<{ error: string }>;
      }

      export const Step: IActions = createActionSteps('LOGIN_ACCOUNT',
        (request: IRequest) => ({ request }),
        (user: Models.IUser) => ({ user }),
        (error: string) => ({ error }),
      );
      
    }

    export namespace CreateAccount {

      import IUser = FluxAccounts.Models.IUser;

      export interface IRequest {
        name: string;
        email: string;
        password: string;
        password_confirmation: string;
      }

      export interface IActions extends IActionSteps {
        REQUEST: (user: IRequest) => IActionPayload<{ user: IRequest }>;
        SUCCESS: (user: IUser) => IActionPayload<{ user: Models.IUser }>;
        FAILURE: (error: string) => IActionPayload<{ error: string }>;
      }

      export const Step: IActions = createActionSteps('CREATE_ACCOUNT',
        (user: IRequest) => ({ user }),
        (user: IUser) => ({ user }),
        (error: string) => ({ error }),
      );
    }

    type SetAuthStep = (authStep: Models.AuthStep) => Action;

    export const SetAuthStep: SetAuthStep = createAction('SET_AUTH_STEP', (authStep: Models.AuthStep) => ({ authStep }));

    interface IAllActions {
      createAccount: Actions.CreateAccount.IActions;
      login: Actions.Login.IActions;
      setAuthStep: (authStep: Models.AuthStep) => Action;
    }
  }
  
  const createDefaultState = (): IState => {
    const token = CustomStorage.getItem('token');
    axios.defaults.headers.common['authorization'] = `Bearer ${token}`;
    return {
      user: { email: '', user: '', token:  token ? token : '' },
      error: '',
      authStep: Models.AuthStep.LOGIN,
    };
  };

  export const reducer = handleActions({
    [Actions.Login.Step.type.SUCCESS]: (state: IState, action: IActionPayload<{ user: Models.IUser }>): IState => {
      return { ...state, ...action.payload };
    },
    [Actions.Login.Step.type.FAILURE]: (state, action) => {
      return { ...state, ...action.payload };
    },
    [Actions.CreateAccount.Step.type.SUCCESS]: (state: IState, action): IState => {
      return { ...state, ...action.payload, authStep: Models.AuthStep.CREATE_ACCOUNT_SUCCESS };
    },
    [Actions.CreateAccount.Step.type.FAILURE]: (state, action) => {
      return { ...state, ...action.payload };
    },
    SET_TOKEN: (state, action) => {
      const { token } = action.payload;
      state.user.token = token;
      return {
        ...state,
        user: {
          ...state.user,
          token
        }
      };
    },
    SET_AUTH_STEP: (state, action) => {
      return { ...state, ...action.payload };
    },
  }, createDefaultState());

  export interface IState {
    user: Models.IUser;
    authStep: Models.AuthStep;
    error: string;
  }

}
import { handleActions, createAction } from 'redux-actions';
import { Action } from 'redux';

import { IActionPayload, IActionSteps } from 'src/renderer/flux/utils';
import { createActionSteps } from '../../../flux/utils';

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
    }

    export interface IUser {
      userName: string;
      email: string;
    }
  }

  export namespace Actions {
    export namespace Login {

      export interface IActions {
        REQUEST: () => Action;
        SUCCESS: (token: string) => Action;
        FAILURE: () => Action;
      }

      export const ActionLogin: IActions = {
        REQUEST: createAction('LOGIN_ACCOUNT_REQUEST'),
        SUCCESS: createAction('LOGIN_ACCOUNT_SUCCESS', (token: string) => ({ token })),
        FAILURE: createAction('LOGIN_ACCOUNT_FAILURE', () => ({})),
      };
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

    export const SetAuthStep = createAction('SET_AUTH_STEP', (authStep: Models.AuthStep) => ({ authStep }));

    interface IAllActions {
      createAccount: Actions.CreateAccount.IActions;
      login: Actions.Login.IActions;
      setAuthStep: (authStep: Models.AuthStep) => Action;
    }
  }

  const createDefaultState = (): IState => {
    return {
      user: { email: '', userName: '' },
      error: '',
      authStep: Models.AuthStep.LOGIN,
      token: '',
    };
  };

  export const reducer = handleActions({
    [Actions.CreateAccount.Step.type.SUCCESS]: (state: IState, action): IState => {
      return { ...state, ...action.payload, authStep: Models.AuthStep.CREATE_ACCOUNT_SUCCESS };
    },
    [Actions.CreateAccount.Step.type.FAILURE]: (state, action) => {
      return { ...state, ...action.payload };
    },
    SET_AUTH_STEP: (state, action) => {
      return { ...state, ...action.payload };
    },
  }, createDefaultState());

  export interface IState {
    user: Models.IUser;
    token: string;
    authStep: Models.AuthStep;
    error: string;
  }
}
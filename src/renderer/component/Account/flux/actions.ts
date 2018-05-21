import { handleActions, createAction } from 'redux-actions';
import { Action } from 'redux';
import { IActionPayload } from 'src/renderer/flux/utils';

export interface IChangePasswordFields {
  old_password: string;
  password: string;
  password_confirmation: string;
}

const changePassword:IActionsChangePassword = {
  REQUEST: createAction('CHANGE_PASSWORD_REQUEST', (data:IChangePasswordFields) => data ),
  SUCCESS: createAction('CHANGE_PASSWORD_SUCCESS'),
  FAILURE: createAction('CHANGE_PASSWORD_FAIL')
};

interface IActionsChangePassword {
  REQUEST: (data?:IChangePasswordFields) => IActionPayload<IChangePasswordFields>;
  SUCCESS: () => IActionPayload<any>;
  FAILURE: (error) => IActionPayload<{error:string}>;
}

export namespace AccountSpace {
  interface IRequest {
    old_password: string;
    password: string;
    password_confirmation: string;
  }
  interface IActions {
    changePassword: IActionsChangePassword;
  }
  export const Actions:IActions = {
    changePassword
  };
}

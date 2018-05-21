import { handleActions, createAction } from 'redux-actions';
import { Action } from 'redux';

export interface IChangePasswordFields {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}

const changePassword:IActionsChangePassword = {
  REQUEST: createAction('CHANGE_PASSWORD_REQUEST', (data:IChangePasswordFields) => data ),
  SUCCESS: createAction('CHANGE_PASSWORD_SUCCESS'),
  FAILURE: createAction('CHANGE_PASSWORD_FAIL')
};

interface IActionsChangePassword {
  REQUEST: (data?:IChangePasswordFields) => Action;
  SUCCESS: () => Action;
  FAILURE: () => Action;
}

export namespace AccountSpace {
  interface IActions {
    changePassword: IActionsChangePassword;
  }
  export const Actions:IActions = {
    changePassword
  };
}

import { handleActions, createAction } from 'redux-actions';
import { Action } from 'redux';
import { IActionPayload } from 'src/renderer/flux/utils';

export interface IChangePasswordPayload {
  old_password: string;
  password: string;
  password_confirmation: string;
}
export interface IProfile{
  name: string;

}
const changePassword:IActionsChangePassword = {
  REQUEST: createAction('CHANGE_PASSWORD_REQUEST', (data:IChangePasswordPayload) => data ),
  SUCCESS: createAction('CHANGE_PASSWORD_SUCCESS'),
  FAILURE: createAction('CHANGE_PASSWORD_FAIL')
};
const getProfile = {
  REQUEST: createAction('GET_PROFILE_REQUEST'),
  SUCCESS: createAction('GET_PROFILE_SUCCESS', (data) => data),
  FAILURE: createAction('GET_PROFILE_FAIL', error => error)
};
interface IActionsChangePassword {
  REQUEST: (data?:IChangePasswordPayload) => IActionPayload<IChangePasswordPayload>;
  SUCCESS: () => IActionPayload<any>;
  FAILURE: (error) => IActionPayload<{error:string}>;
}
interface IActionsProfile {
  REQUEST: () =>  IActionPayload<any>;
  SUCCESS: ({name,email}:{name: string, email: string}) => IActionPayload<{name: string, email: string}>;
  FAILURE: () =>  IActionPayload<any>;
}
export namespace AccountSpace {
  interface IRequest {
    old_password: string;
    password: string;
    password_confirmation: string;
  }
  interface IActions {
    changePassword: IActionsChangePassword;
    getProfile: IActionsProfile;
  }
  export const Actions:IActions = {
    changePassword,
    getProfile
  };
}

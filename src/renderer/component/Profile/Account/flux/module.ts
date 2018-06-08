import { createAction, handleActions } from 'redux-actions';

export interface IChangePasswordPayload {
  old_password: string;
  password: string;
  password_confirmation: string;
}

const changePassword = {
  REQUEST: createAction('CHANGE_PASSWORD_REQUEST', (data: IChangePasswordPayload) => data),
  SUCCESS: createAction('CHANGE_PASSWORD_SUCCESS'),
  FAILURE: createAction('CHANGE_PASSWORD_FAIL'),
};
const getProfile     = {
  REQUEST: createAction('GET_PROFILE_REQUEST'),
  SUCCESS: createAction('GET_PROFILE_SUCCESS', data => data),
  FAILURE: createAction('GET_PROFILE_FAIL', error => error),
};
const changeName     = {
  REQUEST: createAction('CHANGE_NAME_REQUEST', name => name),
  SUCCESS: createAction('CHANGE_NAME_SUCCESS', data => data),
  FAILURE: createAction('CHANGE_NAME_FAIL', error => error),
};

export const AccountActions = {
  changePassword,
  getProfile,
  changeName,
};

import { createAction, handleActions } from 'redux-actions';
import { createActionGenerator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { IUser } from 'src/renderer/component/Profile/Authorisation/flux/models';

export interface IChangePasswordPayload {
  old_password: string;
  password: string;
  password_confirmation: string;
}

const createAsyncAction = createActionGenerator('AUTHORISATION');

const loadingProfile     = createAsyncAction('GET_PROFILE');
const changePassword = createAsyncAction('CHANGE_PASSWORD');
const changeName     = createAsyncAction('CHANGE_NAME');

export const AccountActions: IAccountActions = {
  changePassword,
  loadingProfile,
  changeName,
};

export interface IAccountActions {
  loadingProfile: IAsyncAction2<{}, {user: IUser}>;
  changePassword: IAsyncAction2<{ data: IChangePasswordPayload }, {}>;
  changeName: IAsyncAction2<{name: string}, {name: string}>;
}

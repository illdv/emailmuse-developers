import { createReducer } from 'redux-act';
import axios from 'axios';

import { AuthStep, IAuthState } from 'src/renderer/component/Profile/Authorisation/flux/models';
import CustomStorage from 'src/common/CustomStorage';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { AccountActions } from 'src/renderer/component/Profile/Account/flux/module';

const initialState = (token?: string): IAuthState => {
  // noinspection TsLint
  axios.defaults.headers.common.authorization = `Bearer ${token}`;
  return {
    user: { email: '', name: '', token: token ? token : '' },
    error: '',
    authStep: AuthStep.LOGIN,
  };
};

const reducer = createReducer({}, initialState(CustomStorage.getItem('token')));

const actions = AuthorisationActions;

reducer.on(actions.login.SUCCESS, (state, payload): IAuthState => ({
  ...state,
  ...payload,
}));

reducer.on(actions.login.FAILURE, (state, payload): IAuthState => ({
  ...state,
  ...payload,
  authStep: AuthStep.LOGIN,
}));

reducer.on(actions.createAccount.SUCCESS, (state, payload): IAuthState => ({
  ...state,
  ...payload,
  authStep: AuthStep.CHECK_CODE,
}));

reducer.on(actions.createAccount.FAILURE, (state, payload): IAuthState => ({
  ...state,
  ...payload,
  authStep: AuthStep.REGISTRATION,
}));

reducer.on(actions.checkCode.SUCCESS, (state, payload): IAuthState => ({
  ...state,
  ...payload,
  authStep: AuthStep.LOGIN,
}));

reducer.on(actions.resetPassword.SUCCESS, (state, payload): IAuthState => ({
  ...state,
  ...payload,
  authStep: AuthStep.LOGIN,
}));

reducer.on(actions.setAuthStep.REQUEST, (state, payload): IAuthState => ({
  ...state,
  ...payload,
}));

reducer.on(AccountActions.loadingProfile.SUCCESS, (state, payload): IAuthState => ({
  ...state,
  user: { ...state.user, ...payload.user },
}));

reducer.on(AccountActions.changeName.SUCCESS, (state, payload): IAuthState => ({
  ...state,
  user: {
    ...state.user,
    name: payload.name,
  },
}));

export default reducer;

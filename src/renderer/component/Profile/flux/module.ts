import { combineReducers } from 'redux';
import { authReducer } from 'src/renderer/component/Profile/Auth/flux/module';

export const profileReducer = combineReducers({
  auth: authReducer,
  emailAccounts: () => (''),
});

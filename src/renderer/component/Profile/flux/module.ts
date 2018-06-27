import { combineReducers } from 'redux';
import authReducer from 'src/renderer/component/Profile/Authorisation/flux/reducer';

export const profileReducer = combineReducers({
  auth: authReducer,
  emailAccounts: () => (''),
});

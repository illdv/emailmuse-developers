import { combineReducers} from 'redux';

import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import { FluxDrawerMenu } from 'src/renderer/component/Menu/flux/action';
import { FluxBookmarks } from 'src/renderer/component/Bookmarks/flax/action';
import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';
import { FluxToast } from 'src/renderer/component/Toast/flux/actions';

export interface IGlobalState {
  accounts: FluxAccounts.IState;
  drawerMenu: FluxDrawerMenu.IState;
  bookmarks: FluxBookmarks.IState;
  validation: FluxValidation.IState;
  toast: FluxToast.IState;
}

export default combineReducers({
  accounts: FluxAccounts.reducer,
  drawerMenu: FluxDrawerMenu.reducer,
  bookmarks: FluxBookmarks.reducer,
  validation: FluxValidation.reducer,
  toast: FluxToast.reducer,
});
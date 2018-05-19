import { combineReducers} from 'redux';

import { FluxAccounts } from 'src/renderer/component/Accounts/flux/FluxAccounts';
import { FluxDrawerMenu } from 'src/renderer/component/Menu/flux/action';
import { FluxBookmarks } from 'src/renderer/component/Bookmarks/flax/action';

export interface IGlobalState {
  accounts: FluxAccounts.IState;
  drawerMenu: FluxDrawerMenu.IState;
  bookmarks: FluxBookmarks.IState;
}

export default combineReducers({
  accounts: FluxAccounts.reducer,
  drawerMenu: FluxDrawerMenu.reducer,
  bookmarks: FluxBookmarks.reducer,
});
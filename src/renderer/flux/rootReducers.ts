import { combineReducers } from 'redux';

import { FluxAuth } from 'src/renderer/component/Auth/flux/action';
import { FluxMail } from 'src/renderer/component/MailList/flux/action';
import { FluxDrawerMenu } from 'src/renderer/component/Menu/flux/action';
import { FluxBookmarks } from 'src/renderer/component/Bookmarks/flax/action';

export interface IGlobalState {
  accounts: FluxAuth.IState;
  mail: FluxMail.IState;
  drawerMenu: FluxDrawerMenu.IState;
  bookmarks: FluxBookmarks.IState;
}

export default combineReducers({
  accounts: FluxAuth.reducer,
  mail: FluxMail.reducer,
  drawerMenu: FluxDrawerMenu.reducer,
  bookmarks: FluxBookmarks.reducer,
});
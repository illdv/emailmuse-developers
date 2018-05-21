import { combineReducers} from 'redux';

import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import { FluxDrawerMenu } from 'src/renderer/component/Menu/flux/action';
import { FluxBookmarks } from 'src/renderer/component/Bookmarks/flax/action';
import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';
import { ImageLibrary } from 'src/renderer/component/ImageLibrary/store/reducers';

export interface IGlobalState {
  accounts: FluxAccounts.IState;
  drawerMenu: FluxDrawerMenu.IState;
  bookmarks: FluxBookmarks.IState;
  validation: FluxValidation.IState;
  images: ImageLibrary.IState;
}

export default combineReducers({
  accounts: FluxAccounts.reducer,
  drawerMenu: FluxDrawerMenu.reducer,
  bookmarks: FluxBookmarks.reducer,
  validation: FluxValidation.reducer,
  images: ImageLibrary.reducer,
});

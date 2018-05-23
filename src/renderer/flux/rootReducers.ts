import { combineReducers} from 'redux';

import { FluxAccounts } from 'src/renderer/component/Auth/flux/FluxAccounts';
import { FluxDrawerMenu } from 'src/renderer/component/Menu/flux/action';
import { FluxBookmarks } from 'src/renderer/component/Bookmarks/flax/action';
import { FluxValidation } from 'src/renderer/component/Validation/flux/actions';
import { FluxToast } from 'src/renderer/component/Toast/flux/actions';
import { ImageLibrary } from 'src/renderer/component/ImageLibrary/store/reducers';
import { Status } from 'src/renderer/component/PreloaderLayout/Status/reducers';
import * as StatusConstants from 'src/renderer/component/PreloaderLayout/Status/constants';

import templates from 'src/renderer/component/Templates/flux/module';
import { ITemplateState } from 'src/renderer/component/Templates/models';

export interface IGlobalState {
  accounts: FluxAccounts.IState;
  drawerMenu: FluxDrawerMenu.IState;
  bookmarks: FluxBookmarks.IState;
  validation: FluxValidation.IState;
  toast: FluxToast.IState;
  templates: ITemplateState;
  images: ImageLibrary.IState;
  status: StatusConstants.TStatus;
}

export default combineReducers({
  accounts: FluxAccounts.reducer,
  drawerMenu: FluxDrawerMenu.reducer,
  bookmarks: FluxBookmarks.reducer,
  validation: FluxValidation.reducer,
  toast: FluxToast.reducer,
  templates,
  images: ImageLibrary.reducer,
  status: Status.reducer,
});
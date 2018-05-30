import { combineReducers} from 'redux';
import { FluxDrawerMenu } from 'src/renderer/component/Menu/flux/action';
import { FluxToast } from 'src/renderer/common/Toast/flux/actions';
import { ImageLibrary } from 'src/renderer/component/ImageLibrary/store/reducers';
import { Status } from 'src/renderer/common/PreloaderLayout/Status/reducers';
import * as StatusConstants from 'src/renderer/common/PreloaderLayout/Status/constants';

import templates from 'src/renderer/component/Templates/flux/module';
import { ITemplateState } from 'src/renderer/component/Templates/flux/models';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { profileReducer } from 'src/renderer/component/Profile/flux/module';

export interface IGlobalState {
  profile: IProfileState;
  drawerMenu: FluxDrawerMenu.IState;
  toast: FluxToast.IState;
  templates: ITemplateState;
  images: ImageLibrary.IState;
  status: StatusConstants.TStatus;
}

export default combineReducers({
  profile: profileReducer,
  drawerMenu: FluxDrawerMenu.reducer,
  toast: FluxToast.reducer,
  templates,
  images: ImageLibrary.reducer,
  status: Status.reducer,
});

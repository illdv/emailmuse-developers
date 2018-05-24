import { combineReducers} from 'redux';

import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { FluxDrawerMenu } from 'src/renderer/component/Menu/flux/action';
import { FluxValidation } from 'src/renderer/common/Validation/flux/actions';
import { FluxToast } from 'src/renderer/common/Toast/flux/actions';
import { ImageLibrary } from 'src/renderer/component/ImageLibrary/store/reducers';
import { Status } from 'src/renderer/common/PreloaderLayout/Status/reducers';
import * as StatusConstants from 'src/renderer/common/PreloaderLayout/Status/constants';

import templates from 'src/renderer/component/Templates/flux/module';
import { ITemplateState } from 'src/renderer/component/Templates/models';

export interface IGlobalState {
  accounts: FluxAccounts.IState;
  drawerMenu: FluxDrawerMenu.IState;
  validation: FluxValidation.IState;
  toast: FluxToast.IState;
  templates: ITemplateState;
  images: ImageLibrary.IState;
  status: StatusConstants.TStatus;
}

export default combineReducers({
  accounts: FluxAccounts.reducer,
  drawerMenu: FluxDrawerMenu.reducer,
  validation: FluxValidation.reducer,
  toast: FluxToast.reducer,
  templates,
  images: ImageLibrary.reducer,
  status: Status.reducer,
});

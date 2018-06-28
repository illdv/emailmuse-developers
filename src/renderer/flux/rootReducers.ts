import { combineReducers } from 'redux';
import { FluxToast } from 'src/renderer/common/Toast/flux/actions';
import { ImageLibrary } from 'src/renderer/component/ImageLibrary/store/reducers';
import { Status } from 'src/renderer/common/PreloaderLayout/Status/reducers';
import * as StatusConstants from 'src/renderer/common/PreloaderLayout/Status/constants';

import templates from 'src/renderer/component/Templates/flux/module';
import snippets from 'src/renderer/component/Snippets/flux/reducer';
import drawerMenu from 'src/renderer/component/Menu/flux/action';
import layouts from 'src/renderer/component/Layouts/flux/module';
import { ITemplateState } from 'src/renderer/component/Templates/flux/interface';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { profileReducer } from 'src/renderer/component/Profile/flux/module';
import { ISnippetsState } from 'src/renderer/component/Snippets/flux/interface';
import { IDrawerMenuState } from 'src/renderer/component/Menu/flux/interface';
import { ILayoutState } from 'src/renderer/component/Layouts/flux/interface';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';

export interface IGlobalState {
  profile: IProfileState;
  drawerMenu: IDrawerMenuState;
  toast: FluxToast.IState;
  templates: ITemplateState;
  snippets: ISnippetsState;
  images: ImageLibrary.IState;
  status: StatusConstants.TStatus;
  layouts: ILayoutState;
}

const appReducers = combineReducers({
  profile: profileReducer,
  toast: FluxToast.reducer,
  images: ImageLibrary.reducer,
  status: Status.reducer,
  drawerMenu,
  templates,
  snippets,
  layouts,
});

const rootReducer = (state, action) => {
  if (action.type === AuthorisationActions.logout.REQUEST({}).type) {
    state = undefined;
  }
  return appReducers(state, action);
};

export default rootReducer;

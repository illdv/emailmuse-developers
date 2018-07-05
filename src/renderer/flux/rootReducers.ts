import { combineReducers } from 'redux';
import { FluxToast } from 'src/renderer/common/Toast/flux/actions';
import { ImageLibrary } from 'src/renderer/component/ImageLibrary/store/reducers';
import { Status } from 'src/renderer/common/PreloaderLayout/Status/reducers';
import * as StatusConstants from 'src/renderer/common/PreloaderLayout/Status/constants';
import { routerReducer } from 'react-router-redux';

import templates from 'src/renderer/component/Templates/flux/module';
import snippets from 'src/renderer/component/Snippets/flux/reducer';
import layouts from 'src/renderer/component/Layouts/flux/module';
import modalWindow from 'src/renderer/common/ModalWindow/flux/reducer';
import swipe, { ISwipeState } from 'src/renderer/component/Swipe/flux/reducer';
import editor, { IEditorState } from 'src/renderer/component/Editor/flux/reducer';

import { ITemplateState } from 'src/renderer/component/Templates/flux/interface';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { profileReducer } from 'src/renderer/component/Profile/flux/module';
import { ISnippetsState } from 'src/renderer/component/Snippets/flux/interface';
import { ILayoutState } from 'src/renderer/component/Layouts/flux/interface';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { IModalWindowState } from 'src/renderer/common/ModalWindow/flux/reducer';

export interface IGlobalState {
  profile: IProfileState;
  toast: FluxToast.IState;
  templates: ITemplateState;
  snippets: ISnippetsState;
  images: ImageLibrary.IState;
  status: StatusConstants.TStatus;
  layouts: ILayoutState;
  modalWindow: IModalWindowState;
  swipe: ISwipeState;
  editor: IEditorState;
}

const appReducers = combineReducers({
  profile: profileReducer,
  toast: FluxToast.reducer,
  images: ImageLibrary.reducer,
  status: Status.reducer,
  templates,
  snippets,
  layouts,
  modalWindow,
  swipe,
  editor,
  router: routerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AuthorisationActions.logout.REQUEST({}).type) {
    state = undefined;
  }
  return appReducers(state, action);
};

export default rootReducer;

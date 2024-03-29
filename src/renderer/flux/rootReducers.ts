import { combineReducers } from 'redux';
import { FluxToast } from 'src/renderer/common/Toast/flux/actions';
import { ImageLibrary } from 'src/renderer/component/ImageLibrary/store/reducer';
import { Status } from 'src/renderer/common/PreloaderLayout/Status/reducers';
import * as StatusConstants from 'src/renderer/common/PreloaderLayout/Status/constants';
import { routerReducer } from 'react-router-redux';

import folders from 'src/renderer/component/Folder/flux/reduser';
import emails, { IEmailsState } from 'src/renderer/component/Emails/flux/reducer';
import snippets from 'src/renderer/component/Snippets/flux/reducer';
import layouts from 'src/renderer/component/Layouts/flux/module';
import modalWindow from 'src/renderer/common/DialogProvider/flux/reducer';
import swipe, { ISwipeState } from 'src/renderer/component/Swipe/flux/reducer';
import training, { ITrainingState } from 'src/renderer/component/Training/flux/reducer';
import editor, { IEditorState } from 'src/renderer/component/Editor/flux/reducer';
import polls, { IPollsState } from 'src/renderer/component/Profile/Polls/flux/reduser';
import tutorial, { ITutorialState } from 'src/renderer/component/Tutorial/flux/reducer';

import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { profileReducer } from 'src/renderer/component/Profile/flux/module';
import { ISnippetsState } from 'src/renderer/component/Snippets/flux/interface';
import { ILayoutState } from 'src/renderer/component/Layouts/flux/interface';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { IModalWindowState } from 'src/renderer/common/DialogProvider/flux/reducer';
import { IFolderState } from 'src/renderer/component/Folder/flux/reduser';

export interface IGlobalState {
  profile: IProfileState;
  toast: FluxToast.IState;
  emails: IEmailsState;
  folders: IFolderState;
  snippets: ISnippetsState;
  images: ImageLibrary.IState;
  status: StatusConstants.TStatus;
  layouts: ILayoutState;
  modalWindow: IModalWindowState;
  swipe: ISwipeState;
  editor: IEditorState;
  polls: IPollsState;
  training: ITrainingState;
  tutorial: ITutorialState;
}

const appReducers = combineReducers({
  profile: profileReducer,
  toast: FluxToast.reducer,
  images: ImageLibrary.reducer,
  status: Status.reducer,
  emails,
  folders,
  snippets,
  layouts,
  modalWindow,
  swipe,
  editor,
  polls,
  training,
  tutorial,
  router: routerReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AuthorisationActions.logout.REQUEST({}).type) {
    state = undefined;
  }
  return appReducers(state, action);
};

export default rootReducer;

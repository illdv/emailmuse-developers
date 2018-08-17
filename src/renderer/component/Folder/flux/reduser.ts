import { createReducer } from 'redux-act';
import { IFolder } from './interface';
import { folderActions } from './actions';
import { emailActions } from 'src/renderer/component/Emails/flux/action';

export interface IFolderState {
  folders: IFolder[];
}

const initialState = (): IFolderState => ({
  folders: [],
});

const reducer = createReducer({}, initialState());

reducer.on(folderActions.getFolders.SUCCESS, (state, payload): IFolderState => ({
  ...state,
  folders: payload.folders,
}));

reducer.on(folderActions.deleteFolder.SUCCESS, (state, payload): IFolderState => ({
  ...state,
  folders: state.folders.filter(folder => payload.ids.indexOf(folder.id)),
}));

reducer.on(emailActions.getEmailFromFolder.SUCCESS, (state, payload): IFolderState => ({
  ...state,
  folders: [],
}));

export default reducer;

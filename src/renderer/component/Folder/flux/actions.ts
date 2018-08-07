import { createActionCreator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';

const createAsyncAction = createActionCreator('actions');
const createFolder = createAsyncAction('CREATE_FOLDER');
const updateFolder = createAsyncAction('UPDATE_FOLDER');
const deleteFolder = createAsyncAction('DELETE_FOLDER');
const showModal = createAsyncAction('SHOW_FOLDER_MODAL');

export interface IFolderActions {
  showModal: IAsyncAction2<{ parentId: number }, {}>;
  createFolder: IAsyncAction2<{ newFolder: IFolder }, {}>;
  updateFolder: IAsyncAction2<{ selectedSubject: ITemplate }, {}>;
  deleteFolder: IAsyncAction2<{ selectedSubject: ITemplate }, {}>;
}

export const folderActions: IFolderActions = {
  createFolder, updateFolder, deleteFolder, showModal,
};

import { createActionCreator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { IFolder } from 'src/renderer/component/Folder/flux/interface';

const createAsyncAction = createActionCreator('actions');
const getFolders = createAsyncAction('GET_FOLDER_MODAL');
const createFolder = createAsyncAction('CREATE_FOLDER');
const updateFolder = createAsyncAction('UPDATE_FOLDER');
const deleteFolder = createAsyncAction('DELETE_FOLDER');
const showModal = createAsyncAction('SHOW_FOLDER_MODAL');

export interface IFolderActions {
  showModal: IAsyncAction2<{ parentId: number }, {}>;
  createFolder: IAsyncAction2<{ folder: IFolder }, {}>;
  updateFolder: IAsyncAction2<{ folder: IFolder }, {}>;
  deleteFolder: IAsyncAction2<{ ids: number[] }, { ids: number[] }>;
  getFolders: IAsyncAction2<{}, { folders: IFolder[] }>;
}

export const folderActions: IFolderActions = {
  createFolder, updateFolder, deleteFolder, showModal, getFolders,
};

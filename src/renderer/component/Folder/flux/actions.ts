import { createActionGenerator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { IFolder } from 'src/renderer/component/Folder/flux/interface';

const createAsyncAction = createActionGenerator('FOLDERS');
const getFolders = createAsyncAction('GET');
const createFolder = createAsyncAction('CREATE');
const updateFolder = createAsyncAction('UPDATE');
const deleteFolder = createAsyncAction('DELETE');
const showModal = createAsyncAction('SHOW_FOLDER_MODAL');
const openFolder = createAsyncAction('OPEN');

export interface IFolderActions {
  showModal: IAsyncAction2<{ parentId: number }, {}>;
  createFolder: IAsyncAction2<{ folder: IFolder }, {}>;
  updateFolder: IAsyncAction2<{ folder: IFolder }, {}>;
  deleteFolder: IAsyncAction2<{ ids: number[] }, { ids: number[] }>;
  getFolders: IAsyncAction2<{}, { folders: IFolder[] }>;
  openFolder: IAsyncAction2<{ folder?: IFolder }, {}>;

}

export const FolderActions: IFolderActions = {
  createFolder, updateFolder, deleteFolder, showModal, getFolders, openFolder,
};

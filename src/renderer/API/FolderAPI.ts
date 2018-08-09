import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';

function createFolder(payload: IFolder): any {
  const request: ICreateUpdateFolderRequest = {
    name: payload.name,
    parent_id: payload.parentId,
    description: null,
  };
  return AxiosWrapper.post('/folders', request);
}

function updateFolder(folderId: number, payload: IFolder): any {
  const request: ICreateUpdateFolderRequest = {
    name: payload.name,
    parent_id: payload.parentId,
    description: null,
  };
  return AxiosWrapper.put(`/folders/${folderId}`, request);
}

function deleteFolders(ids: number[]): any {
  const request: IDeleteFolderRequest = { ids };
  return AxiosWrapper.deleteResponse2(`/folders/$`, request);
}

export const FolderAPI = {
  createFolder,
  updateFolder,
  deleteFolders,
};

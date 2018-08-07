import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';

function createFolder(payload: IFolder): any {
  const request: ICreateFolderRequest = {
    name: payload.name,
    parent_id: payload.parentId,
  };
  return AxiosWrapper.post('/folders', request);
}

function updateFolder(pollId: string, payload: IFolder): any {
  const request: ICreateFolderRequest = {
    name: payload.name,
    parent_id: payload.parentId,
  };
  return AxiosWrapper.put(`/folders/${pollId}`, request);
}

function deleteFolders(pollIds: number[]): any {
  return AxiosWrapper.deleteResponse2(`/folders/$`, pollIds);
}

export const FolderAPI = {
  createFolder,
  updateFolder,
  deleteFolders,
};

import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import {
  ICreateUpdateFolderRequest,
  IDeleteFolderRequest,
  IFolder,
} from 'src/renderer/component/Folder/flux/interface';

const getFoldersAndEmails = (s: string) => {
  return AxiosWrapper.get(`/folders?s=${s || ''}`);
};

function getEmailsInFolder(id: number): any {
  return AxiosWrapper.get(`/folders/${id || ''}`);
}

function createFolder(payload: IFolder): any {
  const request: ICreateUpdateFolderRequest = {
    name: payload.name,
    parent_id: payload.parentId,
  };
  return AxiosWrapper.post('/folders', request);
}

function updateFolder(folderId: number, payload: IFolder): any {
  const request: ICreateUpdateFolderRequest = {
    name: payload.name,
    parent_id: payload.parentId,
  };
  return AxiosWrapper.put(`/folders/${folderId}`, request);
}

function deleteFolders(ids: number[]): any {
  const request: IDeleteFolderRequest = { ids };
  return AxiosWrapper.deleteResponse2(`/folders`, request);
}

export const FolderAPI = {
  createFolder,
  updateFolder,
  deleteFolders,
  getFoldersAndEmails,
  getEmailsInFolder,
};

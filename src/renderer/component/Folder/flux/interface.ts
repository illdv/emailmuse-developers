import { IEmail, nodeType } from 'src/renderer/component/Emails/flux/interfaceAPI';

export interface IFolder {
  id: number;
  name: string;
  type: nodeType.folder;
  parentId?: number;   // now this field doesn't come fom backend
  created_at?: string;
  deleted_at?: string;
  updated_at?: string;
  user_id?: number;
}

export interface ICreateUpdateFolderRequest {
  name: string;
  parent_id: number;
}

export interface IDeleteFolderRequest {
  ids: number[];
}

export interface IGetFoldersEmailsResponse {
  folders: IFolder[];
  emails: IEmail[];
}

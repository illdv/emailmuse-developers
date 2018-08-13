import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';

export interface IFolder {
  id: number;
  name: string;
  parentId: number;
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

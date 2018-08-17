import { IEmail, IFolderEmail, nodeType } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { EntityType, IEditEntity } from 'src/renderer/component/Editor/flux/interface';
import { IFolder } from 'src/renderer/component/Folder/flux/interface';

export interface INodeItem {
  id: string;
  title: string;
  description: string;
  rightText: string;
}

export function nodeToItem(node: IEmail): INodeItem {
  return {
    id: String(node.id),
    title: node.title,
    description: node.description,
    rightText: node.updated_at,
  };
}

export function emailToFolderEmail(email: IEmail): IFolderEmail {
  return {
    id: email.id,
    title: email.title || '',
    type: email.type,
    updated_at: email.updated_at,
    description: email.description || '',
  };
}

export function folderToFolderEmail(folder: IFolder): IFolderEmail {
  return {
    id: folder.id,
    title: folder.name || '',
    type: folder.type,
    updated_at: folder.updated_at,
    description: '---',
  };
}

export function folderEmailToFolder(folderEmail: IFolderEmail): IFolder {
  return {
    id: folderEmail.id,
    name: folderEmail.title,
    type: nodeType.folder,
  };
}

export function folderEmailToEntity(folderEmail: IFolderEmail): IEditEntity {
  return {
    id: folderEmail.id,
    folderId: folderEmail.folderId,
    html: folderEmail.body,
    idFrontEnd: new Date().getTime().toString(),
    type: EntityType.Email,
    params: {
      subject: folderEmail.title,
      description: folderEmail.description,
    },
  };
}

export function emailToEditEntity({ id, body, title, description, folder_id }: IEmail): IEditEntity {
  return {
    id,
    folderId: folder_id,
    html: body,
    idFrontEnd: new Date().getTime().toString(),
    type: EntityType.Email,
    params: {
      subject: title,
      description,
    },
  };
}

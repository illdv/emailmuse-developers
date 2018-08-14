import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { EntityType, IEditEntity } from 'src/renderer/component/Editor/flux/interface';

export interface INodeItem {
  id: string;
  title: string;
  description: string;
  rightText: string;
}

export function nodeToItem(node: IEmail): INodeItem {
  return {
    id: node.id,
    title: node.title,
    description: node.description,
    rightText: node.updated_at,
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

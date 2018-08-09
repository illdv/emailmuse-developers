import { INode } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { EntityType, IEditEntity } from 'src/renderer/component/Editor/flux/interface';

export interface INodeItem {
  id: string;
  title: string;
  description: string;
  rightText: string;
  nodeId: number;
  type: string;
}

export function nodeToItem(node: INode): INodeItem {
  return {
    id: node.id,
    title: node.title,
    nodeId: node.node_id,
    description: node.description,
    rightText: node.updated_at,
    type: node.type,
  };
}

export function emailToEditEntity({ id, body, title, description }: INode): IEditEntity {
  return {
    id,
    html: body,
    idFrontEnd: new Date().getTime().toString(),
    type: EntityType.Email,
    params: {
      subject: title,
      description,
    },
  };
}

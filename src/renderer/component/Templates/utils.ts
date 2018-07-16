import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { IListItem } from 'src/renderer/common/List/ListTable/ListTable';
import { EntityType, IEditEntity } from 'src/renderer/component/Editor/flux/interface';

export function createTemplate(): ITemplate {
  return {
    id: null,
    description: '---',
    title: 'Title',
    body: 'Content',
  };
}

export function templateToItem(templates: ITemplate): IListItem {
  return {
    id: templates.id,
    title: templates.title,
    description: templates.description,
    rightText: templates.updated_at,
  };
}

export function emailToEditEntity({id, body, title, description}: ITemplate): IEditEntity {
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

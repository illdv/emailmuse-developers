import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { ICustomItem } from 'src/renderer/common/List/ElementList';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';

export function createEmptyTemplate(): ITemplate {
  return {
    id: null,
    user_id: 0,
    updated_at: '',
    description: '',
    title: 'Template',
    body: '',
    created_at: '',
    deleted_at: '',
  };
}
export function templateToItem(templates: ITemplate): ICustomItem {
  return {
    id: templates.id,
    title: templates.title,
    description: templates.description,
    rightText: templates.updated_at,
  };
}

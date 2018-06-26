import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';

export function createLayout(template: ILayout): ITemplate {
  return {
    id: null,
    user_id: 0,
    updated_at: '',
    description: '',
    title: 'Template',
    body: template.body,
    created_at: '',
    deleted_at: '',
  };
}
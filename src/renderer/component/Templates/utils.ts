import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';

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

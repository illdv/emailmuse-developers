import { ITemplate } from 'src/renderer/component/Templates/flux/entity';

export function createEmptyTemplate(): ITemplate {
  return {
    id: 0,
    user_id: 0,
    updated_at: '',
    description: '',
    title: 'Template',
    body: '',
    created_at: '',
    deleted_at: '',
  };
}

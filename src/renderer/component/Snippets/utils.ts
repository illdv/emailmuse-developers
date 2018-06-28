import { IListItem } from 'src/renderer/common/List/ElementTable';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';

export const createEmptySnippet = () => ({
  id: null,
  user_id: null,
  shortcut: '',
  description: '',
  body: '',
  updated_at: '',
  created_at: '',
});

export function snippetToItem(snippet: ISnippet): IListItem {
  return {
    id: snippet.id.toString(),
    title: snippet.shortcut,
    description: snippet.description,
    rightText: snippet.updated_at,
  };
}

import { ICustomItem } from 'src/renderer/common/List/ElementList';
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

export function snippetToItem(snippet: ISnippet): ICustomItem {
  return {
    id: snippet.id.toString(),
    title: snippet.shortcut,
    description: snippet.description,
    rightText: snippet.updated_at,
  };
}

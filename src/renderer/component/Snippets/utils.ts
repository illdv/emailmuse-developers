import { ICustomItem } from 'src/renderer/common/List/ListElement';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';

export function snippetToItem(snippet: ISnippet): ICustomItem {
  return {
    id: snippet.id.toString(),
    title: snippet.shortcut,
    description: snippet.description,
    rightText: snippet.updated_at,
  };
}

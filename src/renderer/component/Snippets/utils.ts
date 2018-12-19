import { IListItem } from 'src/renderer/common/List/ListTable/ListTable';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { EntityType, IEditEntity } from 'src/renderer/component/Editor/flux/interface';

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

export function snippetToEditEntity({ id, body, shortcut }: ISnippet): IEditEntity {
  return {
    id: id ? id : null,
    idFrontEnd: new Date().getTime().toString(),
    type: EntityType.Snippet,
    html: body,
    folderId: null, // set root folder
    params: {
      ['Snippet Name']: shortcut,
    },
  };
}

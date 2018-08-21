import { createActionGenerator } from 'src/renderer/flux/utils';
import { IPagination } from 'src/renderer/common/List/interface';
import { IAsyncAction } from 'src/renderer/flux/interface';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';

const createAction = createActionGenerator('SNIPPETS');

const loading = createAction('LOADING_SNIPPETS');
const remove = createAction('REMOVE_SNIPPETS');
const add = createAction('ADD_SNIPPETS');
const edit = createAction('EDIT_SNIPPETS');

export interface ISnippetsAction {
  loading: IAsyncAction<{ page?: number, shortcut?: string }, ISuccessfullyPayload, {}>;
  remove: IAsyncAction<{ id: string }, {}, {}>;
  add: IAsyncAction<{ snippet: ISnippet }, { snippet: ISnippet }, {}>;
  edit: IAsyncAction<{ snippet: ISnippet }, {}, {}>;
}

export interface ISuccessfullyPayload {
  snippets: ISnippet[];
  pagination: IPagination;
}

export const SnippetsAction: ISnippetsAction = {
  loading,
  remove,
  add,
  edit,
};

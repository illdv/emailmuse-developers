import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { IPagination } from 'src/renderer/common/List/interface';
import { Action, ActionStatus, IAsyncAction } from 'src/renderer/flux/interface';

export interface ISnippetsState {
  snippets: ISnippet[];
  pagination: IPagination;
  status: ActionStatus;
  selectSnippet: ISnippet;
}

export interface ISnippetsAction {
  loading: IAsyncAction<{ page?: number, shortcut?: string }, ISuccessfullyPayload, {}>;
  remove: IAsyncAction<{ id: string }, {}, {}>;
  add: IAsyncAction<{ snippet: ISnippet }, { snippet: ISnippet }, {}>;
  edit: IAsyncAction<{ snippet: ISnippet }, {}, {}>;
  selectSnippet: Action<{ selectSnippet: ISnippet }>;
  saveAndClose: Action<{ snippet: ISnippet }>;
}

export interface ISuccessfullyPayload {
  snippets: ISnippet[];
  pagination: IPagination;
}

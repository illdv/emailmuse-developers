import { ActionStatus } from 'src/renderer/flux/utils';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { IPagination } from 'src/renderer/common/List/interface';
import { ComplexActionCreator1 } from 'redux-act';

export interface ISnippetsState {
  snippets: ISnippet[];
  pagination: IPagination;
  status: ActionStatus;
}

export interface ISnippetsAction {
  loading: {
    REQUEST: ComplexActionCreator1<{ page: number }, { page: number }, {}>;
    SUCCESS: ComplexActionCreator1<ISuccessfullyPayload, ISuccessfullyPayload, {}>;
    FAILURE: ComplexActionCreator1<{}, {}, {}>
  };
  remove: {
    REQUEST: ComplexActionCreator1<{ id: string }, { id: string }, {}>;
    SUCCESS: ComplexActionCreator1<{}, {}, {}>;
    FAILURE: ComplexActionCreator1<{}, {}, {}>
  };
  add: {
    REQUEST: ComplexActionCreator1<{ snippet: ISnippet }, { snippet: ISnippet }, {}>;
    SUCCESS: ComplexActionCreator1<{}, {}, {}>;
    FAILURE: ComplexActionCreator1<{}, {}, {}>
  };
  edit: {
    REQUEST: ComplexActionCreator1<{ snippet: ISnippet }, { snippet: ISnippet }, {}>;
    SUCCESS: ComplexActionCreator1<{}, {}, {}>;
    FAILURE: ComplexActionCreator1<{}, {}, {}>
  };
}

export interface ISuccessfullyPayload {
  snippets: ISnippet[];
  pagination: IPagination;
}

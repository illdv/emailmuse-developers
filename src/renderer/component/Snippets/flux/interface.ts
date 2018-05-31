import { ActionStatus } from 'src/renderer/flux/utils';
import { Action, ComplexActionCreator1, EmptyActionCreator } from 'redux-act';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { IPagination } from 'src/renderer/common/List/interface';
import any = jasmine.any;

export interface ISnippetsState {
  snippet: ISnippet[];
  pagination: IPagination;
  status: ActionStatus;
}

export interface ISnippetsAction {
  loading: EmptyActionCreator;
  failure: EmptyActionCreator;
  successfully: (payload: { snippet: ISnippet[], pagination: IPagination }) => Action<any>;
}

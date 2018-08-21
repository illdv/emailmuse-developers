import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { IPagination } from 'src/renderer/common/List/interface';
import { CreateAction, ActionStatus, IAsyncAction } from 'src/renderer/flux/interface';

export interface ISnippetsState {
  snippets: ISnippet[];
  pagination: IPagination;
  status: ActionStatus;
}

import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { IPagination } from 'src/renderer/common/List/interface';

export interface ILayout {
  id?: string;
  title: string;
  body: string;
  icon?: string;
  icon_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ILayoutState {
  layouts: ILayout[];
  pagination: IPagination;
}

export interface ILayoutActions {
  loading: IAsyncAction2<{ page?: number }, { layouts: ILayout[], pagination: IPagination }>;
  create: IAsyncAction2<{ layout: ILayout }, { }>;
  edit: IAsyncAction2<{ layout: ILayout }, {}>;
  remove: IAsyncAction2<{ id: string }, {}>;
}

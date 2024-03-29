import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { IPagination } from 'src/renderer/common/List/interface';

export interface ILayout {
  id?: number;
  title: string;
  body: string;
  user_id?: number;
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
  create: IAsyncAction2<{ layout: ILayout }, {}>;
  edit: IAsyncAction2<{ layout: ILayout }, {}>;
  remove: IAsyncAction2<{ ids: string[] }, {}>;
}

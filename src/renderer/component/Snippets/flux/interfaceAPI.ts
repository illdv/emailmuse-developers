export interface ILoadingResponse {
  current_page: number;
  data: ISnippet[];
  first_page_url: string;
  from?: any;
  last_page: number;
  last_page_url: string;
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to?: any;
  total: number;
}

export interface ISnippet {
  id: number;
  shortcut: string;
  body: string;
  user_id?: number;
  description: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: any;
}

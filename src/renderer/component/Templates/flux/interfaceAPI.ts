export interface ITemplate {
  title: string;
  body: string;
  description?: string;
  id?: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export interface ITemplatesResponse {
  current_page: number;
  data: ITemplate[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url?: any;
  path: string;
  per_page: number;
  prev_page_url?: any;
  to: number;
  total: number;
}

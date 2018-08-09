export interface INode {
  title: string;
  body: string;
  type?: nodeType;
  node_id?: number;
  description?: string;
  id?: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export enum nodeType {
  email = 'email',
  folder = 'folder',
}

export interface ITemplatesResponse {
  current_page: number;
  data: INode[];
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

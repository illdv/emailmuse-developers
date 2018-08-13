export interface IEmail {
  title: string;
  body: string;
  folder_id: number;
  id?: string;
  description?: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

// export enum nodeType {
//   email = 'email',
//   folder = 'folder',
// }

export interface INodesResponse {
  current_page: number;
  data: any;
  path: string;
  from: number;
  to: number;
  total: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
  per_page: number;
  prev_page_url?: any;
  next_page_url?: any;
}

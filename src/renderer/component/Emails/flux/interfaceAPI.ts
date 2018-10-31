export interface IEmail {
  id: number;
  title: string;
  type: nodeType.email;
  body: string;
  folder_id: number;
  description?: string;
  preheader?: string;
  user_id?: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}

export enum nodeType {
  email = 'email',
  folder = 'folder',
}

export interface IFolderEmail {
  id: number;
  type: nodeType;
  title: string;
  updated_at: string;
  preheader?: string;
  body?: string;
  description?: string;
  folderId?: number;
}

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

export interface ITemplate {
  id: number;
  user_id: number;
  title: string;
  description: string;
  body: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}

export interface ITemplateState {
  status: string;
  pages: object;
  isDialogSelectImageOpen: boolean;
}

export interface IResponseTemplates {
  current_page: number;
  data: object;
}

export interface IDataForCreateTemplate {
  title: string;
  body: string;
  description: string;
}

export interface IDataForEditTemplate {
  id: number;
  title: string;
  body: string;
  description: string;
}

export interface IDataForDeleteTemplates {
  id: number[];
}
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

export enum TemplateStatus {
  EditTemplate = 'EditTemplate',
  CreateTemplate = 'CreateTemplate',
  Success = 'Success',
  Loading = 'Loading',
  Failed = 'Failed',
}

export interface ITemplateState {
  status: TemplateStatus;
  page: number;
  templates: ITemplate[];
  selectedTemplate: ITemplate;
}

export interface IResponseTemplates {
  page: number;
  templates: ITemplate[];
}
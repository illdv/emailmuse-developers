import { ITemplate } from 'src/renderer/component/Templates/flux/entity';
import { IPagination } from 'src/renderer/component/ImageLibrary/store/models';

export enum TemplateStatus {
  EditTemplate   = 'EditTemplate',
  CreateTemplate = 'CreateTemplate',
  Success        = 'Success',
  Loading        = 'Loading',
  Failed         = 'Failed',
}

export interface ITemplateState {
  status: TemplateStatus;
  pagination: IPagination;
  templates: ITemplate[];
  selectedTemplate: ITemplate;
}

export interface ILoadingTemplatePayload {
  pagination: IPagination;
  templates: ITemplate[];
}

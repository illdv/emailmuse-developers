import { ITemplate } from 'src/renderer/component/Templates/flux/entity';
import { IPagination } from 'src/renderer/common/List/interface';
import { ActionStatus } from 'src/renderer/flux/utils';

export interface ITemplateState {
  status: ActionStatus;
  pagination: IPagination;
  templates: ITemplate[];
  selectedTemplate: ITemplate;
}

export interface ILoadingTemplatePayload {
  pagination: IPagination;
  templates: ITemplate[];
}

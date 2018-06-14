import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { IPagination } from 'src/renderer/common/List/interface';
import { Action, ActionStatus } from 'src/renderer/flux/interface';
import { ActionCreatorsMapObject } from 'redux';
import { EmptyActionCreator } from 'redux-act';

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

export interface ITemplateAction extends ActionCreatorsMapObject {
  loading?: Action<{ page: number, hidePreloader?: boolean }>;
  remove?: Action<string>;
  save?: Action<{ template: ITemplate, saveAndClose: boolean }>;
  create?: Action<ITemplate>;
  select?: Action<ITemplate>;
  failure?: EmptyActionCreator;
  successfully?: Action<ILoadingTemplatePayload>;
  createSuccess?: Action<ITemplate>;
}

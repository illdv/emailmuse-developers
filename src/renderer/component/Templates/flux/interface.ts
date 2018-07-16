import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { IPagination } from 'src/renderer/common/List/interface';
import { ActionStatus, CreateAction } from 'src/renderer/flux/interface';
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

// TODO: delete ?
export interface ITemplateActions extends ActionCreatorsMapObject {
  loading?: CreateAction<{ page: number, hidePreloader?: boolean, search?: string }>;
  remove?: CreateAction<string>;
  save?: CreateAction<{ template: ITemplate, saveAndClose: boolean }>;
  create?: CreateAction<ITemplate>;
  select?: CreateAction<ITemplate>;
  failure?: EmptyActionCreator;
  successfully?: CreateAction<ILoadingTemplatePayload>;
  createSuccess?: CreateAction<ITemplate[]>;
  copy?: CreateAction<{ id: string }>;
  selectNewTemplate?: CreateAction<{}>;
}

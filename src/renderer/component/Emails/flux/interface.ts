import { INode } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { IPagination } from 'src/renderer/common/List/interface';
import { ActionStatus, CreateAction } from 'src/renderer/flux/interface';
import { ActionCreatorsMapObject } from 'redux';
import { EmptyActionCreator } from 'redux-act';

export interface ITemplateState {
  status: ActionStatus;
  pagination: IPagination;
  templates: INode[];
  selectedTemplate: INode;
}

export interface ILoadingTemplatePayload {
  pagination: IPagination;
  templates: INode[];
}

// TODO: delete ?
export interface IEmailActions extends ActionCreatorsMapObject {
  loading?: CreateAction<{ page: number, hidePreloader?: boolean, search?: string }>;
  remove?: CreateAction<string>;
  save?: CreateAction<{ email: INode, saveAndClose: boolean }>;
  create?: CreateAction<INode>;
  select?: CreateAction<INode>;
  failure?: EmptyActionCreator;
  successfully?: CreateAction<ILoadingTemplatePayload>;
  createSuccess?: CreateAction<INode[]>;
  copy?: CreateAction<{ id: string }>;
  selectNewTemplate?: CreateAction<{}>;
}

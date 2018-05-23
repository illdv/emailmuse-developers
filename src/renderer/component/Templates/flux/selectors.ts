import { createSelector } from 'reselect';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ITemplate, ITemplateState } from 'src/renderer/component/Templates/models';

const getTemplates = (state: IGlobalState) => state.templates;

export const getStatus = createSelector(getTemplates, (templates: ITemplateState) =>  templates.status);
export const getPages = createSelector(getTemplates, (templates: ITemplateState) => templates.pages);
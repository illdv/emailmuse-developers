import { createActionCreator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { EntityType, IEditEntity } from 'src/renderer/component/Editor/flux/interface';

const createAsyncAction = createActionCreator('EDITOR');

const edit         = createAsyncAction('EDIT');
const save         = createAsyncAction('SAVE');
const close        = createAsyncAction('CLOSE');
const remove       = createAsyncAction('REMOVE');
const saveAndClose = createAsyncAction('SAVE_AND_CLOSE');

export const EditorActions: IEditorActions = {
  edit,
  save,
  close,
  remove,
  saveAndClose,
};

export interface IEditorActions {
  edit: IAsyncAction2<IEditEntity>;
  save: IAsyncAction2<IEditEntity>;
  close: IAsyncAction2<{ type: EntityType }>;
  remove: IAsyncAction2<IEditEntity>;
  saveAndClose: IAsyncAction2<IEditEntity>;
}

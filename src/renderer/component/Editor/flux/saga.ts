import { createWatch } from 'src/renderer/flux/saga/utils';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import { push } from 'react-router-redux';
import { put } from 'redux-saga/effects';
import { Action } from 'redux-act';
import { EntityType, IEditEntity } from 'src/renderer/component/Editor/flux/interface';
import { TemplateActions } from 'src/renderer/component/Templates/flux/module';

function* sagaEdit() {
  yield put(push('/editor'));
}

function* sagaSave(action: Action<{ editEntity: IEditEntity }>) {
  const { type, html, id, params } = action.payload.editEntity;
  if (type === EntityType.Email) {
    const template = {
      body: html,
      id,
      description: params.description.value,
      title: params.title.value,
    };

    if (template.id) {
      yield put(TemplateActions.save({ template, saveAndClose: false }));
    } else {
      yield put(TemplateActions.create(template));
    }
  }
}

function* sagaClose(action: Action<{ editEntity: IEditEntity }>) {
  yield put(push('/emails'));
}

function* sagaRemove(action: Action<{ editEntity: IEditEntity }>) {
  const { type, id } = action.payload.editEntity;
  if (id) {
    if (type === EntityType.Email) {
      yield put(TemplateActions.remove(id));
    }
  }
  yield put(push('/emails'));
}

const watchEdit   = createWatch(EditorActions.edit, sagaEdit);
const watchSave   = createWatch(EditorActions.save, sagaSave);
const watchClose  = createWatch(EditorActions.close, sagaClose);
const watchRemove = createWatch(EditorActions.remove, sagaRemove);

export default [watchEdit, watchSave, watchClose, watchRemove];

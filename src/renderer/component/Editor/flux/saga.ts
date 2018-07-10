import { push } from 'react-router-redux';
import { call, put } from 'redux-saga/effects';
import { Action } from 'redux-act';
import { delay } from 'redux-saga';

import { createWatch } from 'src/renderer/flux/saga/utils';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import { EntityType, IEditEntity, IEditEntityParameter } from 'src/renderer/component/Editor/flux/interface';
import { TemplateActions } from 'src/renderer/component/Templates/flux/module';
import { toastError } from 'src/renderer/flux/saga/toast';
import { firstSymbolUp } from 'src/renderer/component/Editor/utils';

function* sagaEdit() {
  yield put(push('/editor'));
}

function validation(params: IEditEntityParameter): string {
  console.log(params);
  for (const key of Object.keys(params)) {
    const value = params[key];
    if (!value) {
      return key;
    }
    if (value.length === 0) {
      return key;
    }
  }
  return null;
}

function* sagaSave(action: Action<IEditEntity>) {
  const { type, id, params, html } = action.payload;

  const validationResult = validation(params);
  if (validationResult) {
    yield call(toastError, `${firstSymbolUp(validationResult)} can't be empty`);
    return;
  }

  if (type === EntityType.Email) {
    const template = {
      body: html,
      id,
      description: params.description,
      title: params.title,
    };

    if (template.id) {
      yield put(TemplateActions.save({ template, saveAndClose: false }));
    } else {
      yield put(TemplateActions.create(template));
    }
  }
}

function* sagaClose(action: Action<{}>) {
  yield delay(100);
  yield put(push('/emails'));
}

function* sagaRemove(action: Action<IEditEntity>) {
  const { type, id } = action.payload;
  if (id) {
    if (type === EntityType.Email) {
      yield put(TemplateActions.remove(id));
    }
  }
  // TODO: fix problem whit async remove
  yield delay(100);
  yield put(push('/emails'));
}

function* sagaSaveAndClose(action: Action<IEditEntity>) {
  yield call(sagaSave, action);
  yield put(EditorActions.close.REQUEST({}));
}

const watchEdit         = createWatch(EditorActions.edit, sagaEdit);
const watchSave         = createWatch(EditorActions.save, sagaSave);
const watchClose        = createWatch(EditorActions.close, sagaClose);
const watchRemove       = createWatch(EditorActions.remove, sagaRemove);
const watchSaveAndClose = createWatch(EditorActions.saveAndClose, sagaSaveAndClose);

export default [watchEdit, watchSave, watchSaveAndClose, watchClose, watchRemove];

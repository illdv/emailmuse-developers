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
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { SnippetsAction } from 'src/renderer/component/Snippets/flux/actions';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';

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

  if (type === EntityType.Snippet) {
    const snippet: ISnippet = {
      id: +id,
      body: html,
      description: params.description,
      shortcut: params.shortcut,
    };

    if (snippet.id) {
      yield put(SnippetsAction.edit.REQUEST({ snippet }));
    } else {
      yield put(SnippetsAction.add.REQUEST({ snippet }));
    }
  }

  if (type === EntityType.Layout) {
    const layout: ILayout = {
      id,
      body: html,
      title: params.title,
    };

    if (layout.id) {
      yield put(LayoutActions.edit.REQUEST({ layout }));
    } else {
      yield put(LayoutActions.create.REQUEST({ layout }));
    }
  }
}

function* sagaClose(action: Action<{ type: EntityType }>) {
  yield delay(100);

  if (action.payload.type === EntityType.Email) {
    yield put(push('/emails'));
  }

  if (action.payload.type === EntityType.Layout) {
    yield put(push('/layouts'));
  }

  if (action.payload.type === EntityType.Snippet) {
    yield put(push('/snippets'));
  }
}

function* sagaRemove(action: Action<IEditEntity>) {
  const { type, id } = action.payload;
  if (id) {
    if (type === EntityType.Email) {
      yield put(TemplateActions.remove(id));
    }
    if (type === EntityType.Snippet) {
      yield put(SnippetsAction.remove.REQUEST({ id }));
    }
    if (type === EntityType.Layout) {
      yield put(LayoutActions.remove.REQUEST({ ids: [id] }));
    }
  }

  yield delay(100);
  yield put(EditorActions.close.REQUEST({ type }));
}

function* sagaSaveAndClose(action: Action<IEditEntity>) {
  yield call(sagaSave, action);
  yield put(EditorActions.close.REQUEST({ type: action.payload.type }));
}

const watchEdit         = createWatch(EditorActions.edit, sagaEdit);
const watchSave         = createWatch(EditorActions.save, sagaSave);
const watchClose        = createWatch(EditorActions.close, sagaClose);
const watchRemove       = createWatch(EditorActions.remove, sagaRemove);
const watchSaveAndClose = createWatch(EditorActions.saveAndClose, sagaSaveAndClose);

export default [watchEdit, watchSave, watchSaveAndClose, watchClose, watchRemove];

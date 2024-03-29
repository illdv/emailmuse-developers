import { push } from 'react-router-redux';
import { call, put, select } from 'redux-saga/effects';
import { Action } from 'redux-act';
import { delay } from 'redux-saga';

import { createWatch } from 'src/renderer/flux/saga/utils';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import {
  EntityType,
  IEditEntity,
  IEditEntityParameter,
} from 'src/renderer/component/Editor/flux/interface';
import { toastError } from 'src/renderer/flux/saga/toast';
import { firstSymbolUp } from 'src/renderer/component/Editor/utils';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { SnippetsAction } from 'src/renderer/component/Snippets/flux/actions';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { LayoutActions } from 'src/renderer/component/Layouts/flux/module';
import {
  IEmail,
  nodeType,
} from 'src/renderer/component/Emails/flux/interfaceAPI';
import { FolderActions } from 'src/renderer/component/Folder/flux/actions';
import { emailActions } from 'src/renderer/component/Emails/flux/action';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { isFirstTime, onboardingSteps } from 'src/renderer/common/isFirstTime';

function* sagaEdit() {
  yield put(push('/editor'));
}

function validation(params: IEditEntityParameter): string {
  for (const key of Object.keys(params)) {
    const value = params[key];
    const withoutDescPreh = key !== 'description' && key !== 'preheader';
    if (!value && withoutDescPreh) {
      return key;
    }
    // if (value.length === 0 && key !== 'description' && key !== 'preheader') {
    //   return key;
    // }
  }
  return null;
}

function* sagaSave(action: Action<IEditEntity>) {
  const { type, id, params, html, folderId } = action.payload;
  const validationResult = validation(params);
  if (validationResult) {
    yield call(toastError, `${firstSymbolUp(validationResult)} can't be empty`);
    return;
  }

  const emails = yield select((state: IGlobalState) => state.emails.emails);

  const lastEmailId = emails.length
    ? Math.max.apply(null, emails.map((email: IEmail) => +email.id))
    : null;

  const changedId = (currentId: number) =>
    isFirstTime() && onboardingSteps() !== 1 ? lastEmailId : currentId;

  if (type === EntityType.Email) {
    const email: IEmail = {
      body: html,
      id: changedId(id),
      description: params.description,
      title: params.subject,
      preheader: params.preheader,
      folder_id: folderId,
      type: nodeType.email,
    };

    if (email.id) {
      yield put(emailActions.save.REQUEST({ email, saveAndClose: false }));
    } else {
      yield put(emailActions.create.REQUEST({ email }));
    }
  }

  if (type === EntityType.Snippet) {
    const snippet: ISnippet = {
      id: +id,
      body: html,
      description: params.description,
      shortcut: params['Snippet Name'],
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
    yield put(FolderActions.openFolder.REQUEST({}));
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
      yield put(emailActions.remove.REQUEST({ id }));
    }
    if (type === EntityType.Snippet) {
      yield put(SnippetsAction.remove.REQUEST({ id: String(id) }));
    }
    if (type === EntityType.Layout) {
      yield put(LayoutActions.remove.REQUEST({ ids: [String(id)] }));
    }
  }

  yield delay(100);
  yield put(EditorActions.close.REQUEST({ type }));
}

function* sagaSaveAndClose(action: Action<IEditEntity>) {
  yield call(sagaSave, action);
  yield put(EditorActions.close.REQUEST({ type: action.payload.type }));
}

const watchEdit = createWatch(EditorActions.edit, sagaEdit);
const watchSave = createWatch(EditorActions.save, sagaSave);
const watchClose = createWatch(EditorActions.close, sagaClose);
const watchRemove = createWatch(EditorActions.remove, sagaRemove);
const watchSaveAndClose = createWatch(
  EditorActions.saveAndClose,
  sagaSaveAndClose,
);

export default [
  watchEdit,
  watchSave,
  watchSaveAndClose,
  watchClose,
  watchRemove,
];

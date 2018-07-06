import { createWatch, showModal } from 'src/renderer/flux/saga/utils';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import { push } from 'react-router-redux';
import { call, put, select } from 'redux-saga/effects';
import { Action } from 'redux-act';
import { EntityType, IEditEntity, IEditEntityParameter } from 'src/renderer/component/Editor/flux/interface';
import { TemplateActions } from 'src/renderer/component/Templates/flux/module';
import { toastError } from 'src/renderer/flux/saga/toast';
import { firstSymbolUp } from 'src/renderer/component/Editor/utils';
import { delay } from 'redux-saga';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { ModalWindowType } from 'src/renderer/common/ModalWindow/flux/actions';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { emailToEditEntity } from 'src/renderer/component/Templates/utils';

function* sagaEdit() {
  yield put(push('/editor'));
}

function validation(params: IEditEntityParameter): string {
  for (const key of Object.keys(params)) {
    const value = params[key];
    if (!value && value.length === 0) {
      return key;
    }
  }
  return null;
}

const getBodyForInsert = (state: IGlobalState) => state.editor.bodyForInsert;

function* sagaSave(action: Action<IEditEntity>) {
  const { type, id, params } = action.payload;
  let { html }               = action.payload;

  const bodyForInsert: string = yield select(getBodyForInsert);

  if (bodyForInsert) {
    html = html.replace('CONTENTGOESHERE', bodyForInsert);
  }

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
      if (bodyForInsert) {
        yield put(push('/'));
        yield delay(100);
        yield put(EditorActions.edit.REQUEST(emailToEditEntity(template)));
      }
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

function* sagaNeedInsertBody(action: Action<IEditEntity>) {
  yield call(showModal, ModalWindowType.NeedInsertBody);
}

const watchEdit           = createWatch(EditorActions.edit, sagaEdit);
const watchSave           = createWatch(EditorActions.save, sagaSave);
const watchClose          = createWatch(EditorActions.close, sagaClose);
const watchRemove         = createWatch(EditorActions.remove, sagaRemove);
const watchSaveAndClose   = createWatch(EditorActions.saveAndClose, sagaSaveAndClose);
const watchNeedInsertBody = createWatch(SwipeActions.needInsertBody, sagaNeedInsertBody);

export default [watchEdit, watchSave, watchSaveAndClose, watchClose, watchRemove, watchNeedInsertBody];

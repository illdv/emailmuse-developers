import { push } from 'react-router-redux';

import { put, race, take, takeEvery, select } from 'redux-saga/effects';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { MenuItemType } from 'src/renderer/component/Menu/flux/interface';
import {
  ModalWindowActions,
  ModalWindowType,
} from 'src/renderer/common/DialogProvider/flux/actions';
import { hasEdit, setEdit } from 'src/renderer/component/Editor/Editor';
import { FolderActions } from 'src/renderer/component/Folder/flux/actions';
import { isFirstTime } from 'src/renderer/common/isFirstTime';
import { EditorActions } from '../../Editor/flux/actions';
import { emailToEditEntity } from '../../Emails/utils';
import { nodeType } from '../../Emails/flux/interfaceAPI';
import EmailsForFirstTime from '../EmailsForFirstTime';
import { IGlobalState } from 'src/renderer/flux/rootReducers';

export function* menuSaga(action): IterableIterator<any> {
  if (hasEdit) {
    yield put(
      ModalWindowActions.show.REQUEST({
        type: ModalWindowType.ConfirmationCloseEditor,
      }),
    );

    const { failure } = yield race({
      success: take(ModalWindowActions.show.SUCCESS),
      failure: take(ModalWindowActions.show.FAILURE),
    });

    if (failure) {
      return;
    }
  }

  setEdit(false);
  let routePath = getRoutePath(action);

  if (routePath === '/emails') {
    yield put(FolderActions.openFolder.REQUEST({}));
    if (isFirstTime() === 1) {
      routePath = '/editor';
      yield put(
        EditorActions.edit.REQUEST(
          emailToEditEntity({
            id: null,
            title: EmailsForFirstTime.title,
            body: EmailsForFirstTime.snippet,
            description: '',
            preheader: '',
            folder_id: action.payload.parentId,
            type: nodeType.email,
          }),
        ),
      );
    }
    if (isFirstTime() === 2) {
      routePath = '/editor';
      const emails = yield select((state: IGlobalState) => state.emails.emails);
      const lastEmailId = Math.max.apply(null, emails.map(email => +email.id));

      yield put(
        EditorActions.edit.REQUEST(
          emailToEditEntity({
            id: lastEmailId,
            title: EmailsForFirstTime.title,
            body: EmailsForFirstTime.btn,
            description: '',
            preheader: '',
            folder_id: action.payload.parentId,
            type: nodeType.email,
          }),
        ),
      );
    }
    if (isFirstTime() === 3) {
      routePath = '/editor';
      const emails = yield select((state: IGlobalState) => state.emails.emails);
      const lastEmailId = Math.max.apply(null, emails.map(email => +email.id));

      yield put(
        EditorActions.edit.REQUEST(
          emailToEditEntity({
            id: lastEmailId,
            title: EmailsForFirstTime.title,
            body: EmailsForFirstTime.image,
            description: '',
            preheader: '',
            folder_id: action.payload.parentId,
            type: nodeType.email,
          }),
        ),
      );
    }
  }

  yield put(push(routePath));
}

function getRoutePath(action) {
  switch (action.payload.selectedItem) {
    case MenuItemType.account:
      return '/account';
    case MenuItemType.help:
      return '/help';
    case MenuItemType.image_library:
      return '/image-library';
    case MenuItemType.layouts:
      return '/layouts';
    case MenuItemType.snippets:
      return '/snippets';
    case MenuItemType.swipes:
      return '/swipes';
    case MenuItemType.emails:
      return '/emails';
    case MenuItemType.training:
      return '/training';
    default:
      return '/';
  }
}

export const menuWatcher = takeEvery(DrawerMenuAction.selectMenuItem, menuSaga);

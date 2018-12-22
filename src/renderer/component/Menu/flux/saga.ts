import { push } from 'react-router-redux';

import { put, race, take, takeEvery } from 'redux-saga/effects';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { MenuItemType } from 'src/renderer/component/Menu/flux/interface';
import {
  ModalWindowActions,
  ModalWindowType,
} from 'src/renderer/common/DialogProvider/flux/actions';
import { hasEdit, setEdit } from 'src/renderer/component/Editor/Editor';
import { FolderActions } from 'src/renderer/component/Folder/flux/actions';

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
  const routePath = getRoutePath(action);
  if (routePath === '/emails') {
    yield put(FolderActions.openFolder.REQUEST({}));
  }
  yield put(push(routePath));
}

function getRoutePath(action) {
  switch (action.payload.selectedItem) {
    case MenuItemType.ACCOUNT:
      return '/account';
    case MenuItemType.HELP:
      return '/help';
    case MenuItemType.IMAGE_LIBRARY:
      return '/image-library';
    case MenuItemType.LAYOUTS:
      return '/layouts';
    case MenuItemType.SNIPPETS:
      return '/snippets';
    case MenuItemType.SWIPES:
      return '/swipes';
    case MenuItemType.EMAILS:
      return '/emails';
    case MenuItemType.TRAINING:
      return '/training';
    default:
      return '/';
  }
}

export const menuWatcher = takeEvery(DrawerMenuAction.selectMenuItem, menuSaga);

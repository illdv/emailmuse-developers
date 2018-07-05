import { put, takeEvery } from 'redux-saga/effects';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { push } from 'react-router-redux';
import { MenuItemType } from 'src/renderer/component/Menu/flux/interface';

export function* menuSaga(action): IterableIterator<any> {
  let route;
  // const action: Action<{ selectedItem: MenuItemType }> = yield take(DrawerMenuAction.selectMenuItem);
  switch (action.payload.selectedItem) {
    case MenuItemType.ACCOUNT:
      route = '/account';
      break;
    case MenuItemType.IMAGE_LIBRARY:
      route = '/image-library';
      break;
    case MenuItemType.LAYOUTS:
      route = '/layouts';
      break;
    case MenuItemType.SNIPPETS:
      route = '/snippets';
      break;
    case MenuItemType.SWIPE:
      route = '/swipe';
      break;
    case MenuItemType.TEMPLATES:
      route = '/emails';
      break;
    default:
      route = '/';
  }
  yield put(push(route));
}

export const menuWatcher = takeEvery(DrawerMenuAction.selectMenuItem, menuSaga);

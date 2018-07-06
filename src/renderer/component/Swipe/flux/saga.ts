import { call, put, select } from 'redux-saga/effects';

import { createWatch, showModal } from 'src/renderer/flux/saga/utils';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { ModalWindowActions, ModalWindowType } from 'src/renderer/common/ModalWindow/flux/actions';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { MenuItemType } from 'src/renderer/component/Menu/flux/interface';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import { emailToEditEntity } from 'src/renderer/component/Templates/utils';

function* selectEmail() {
  yield call(showModal, ModalWindowType.SelectLayout);
}

const getSelectedEmail  = (state: IGlobalState) => state.swipe.email;
const getSelectedLayout = (state: IGlobalState) => state.swipe.layout;

function* selectLayout() {
  yield put(ModalWindowActions.hide.REQUEST({}));
  const selectedEmail: ITemplate = yield select(getSelectedEmail);
  const selectedLayout: ILayout  = yield select(getSelectedLayout);

  const layout     = document.createElement('html');
  layout.innerHTML = selectedLayout.body;

  const content: HTMLElement = layout.querySelector('[id=content-email]');
  while (content.hasChildNodes()) {
    content.removeChild(content.lastChild);
  }
  content.insertAdjacentHTML('afterbegin', selectedEmail.body);

  yield put(DrawerMenuAction.selectMenuItem({ selectedItem: MenuItemType.TEMPLATES }));
  yield put(EditorActions.edit.REQUEST(emailToEditEntity({ ...selectedEmail, body: layout.innerHTML })));
}

export default [
  createWatch(SwipeActions.selectEmail, selectEmail),
  createWatch(SwipeActions.selectLayout, selectLayout),
];

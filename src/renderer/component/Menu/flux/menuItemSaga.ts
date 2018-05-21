import { call, take } from 'redux-saga/effects';
import { FluxDrawerMenu } from 'src/renderer/component/Menu/flux/action';

function* selectMenuItem(action: FluxDrawerMenu.IActionsPayload.onSelectMenuItemPayload): IterableIterator<any> {
  /*switch (action.payload.selectedItem) {
    case MenuItemType.INBOX:
      yield put(FluxMail.Actions.onSetLabel(LabelsType.INBOX));
      break;
    case MenuItemType.SEND_MAIL:
      yield put(FluxMail.Actions.onSetLabel(LabelsType.SEND_MAIL));
      break;k
    case MenuItemType.TRASH:
      yield put(FluxMail.Actions.onSetLabel(LabelsType.TRASH));
      break;
    case MenuItemType.SPAM:
      yield put(FluxMail.Actions.onSetLabel(LabelsType.SPAM));
      break;
    case MenuItemType.TEMPLATES:
      yield put(FluxMail.Actions.onSetLabel(LabelsType.TEMPLATE));
      break;
    case MenuItemType.ACCOUNT:
      break;
    case MenuItemType.BOOKMARKS:
      break;
  }*/
}

export function* menuItem(): IterableIterator<any> {
  while (true) {
    const action: any = yield take(FluxDrawerMenu.Actions.selectMenuItem('' as any).type);
    yield call(selectMenuItem, action);
  }
}

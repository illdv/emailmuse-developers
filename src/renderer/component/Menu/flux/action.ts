import { createAction } from 'redux-act';
import { IDrawerMenuActions, MenuItemType } from 'src/renderer/component/Menu/flux/interface';
import { ActionCreatorsMapObject } from 'redux';

export const SELECT_MENU_ITEM = 'SELECT_MENU_ITEM';

const selectMenuItem = createAction(
  SELECT_MENU_ITEM,
  (payload: { selectedItem: MenuItemType }) => (payload));

export const DrawerMenuAction: IDrawerMenuActions & ActionCreatorsMapObject = {
  selectMenuItem,
};

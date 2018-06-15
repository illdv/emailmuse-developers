import { createAction, createReducer } from 'redux-act';
import { IDrawerMenuActions, IDrawerMenuState, MenuItemType } from 'src/renderer/component/Menu/flux/interface';
import { ActionCreatorsMapObject } from 'redux';

export const SELECT_MENU_ITEM = 'SELECT_MENU_ITEM';

const selectMenuItem = createAction(
  SELECT_MENU_ITEM,
  (payload: { selectedItem: MenuItemType }) => (payload));

export const DrawerMenuAction: IDrawerMenuActions & ActionCreatorsMapObject = {
  selectMenuItem,
};

const initialState = (): IDrawerMenuState => {
  return {
    selectedItem: MenuItemType.TEMPLATES,
  };
};

const reducer = createReducer({}, initialState());

reducer.on(selectMenuItem, (state, payload) => ({
  ...state,
  selectedItem: payload.selectedItem,
}));

export default reducer;

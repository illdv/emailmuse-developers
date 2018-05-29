import { handleActions, createAction } from 'redux-actions';
import { IActionPayload } from 'src/renderer/flux/utils';

const SELECT_MENU_ITEM = 'SELECT_MENU_ITEM';

/**
 * Types item menu.
 */
export enum MenuItemType {
  ACCOUNT,
  COMPOSE,
  TEMPLATES,
  TRAINING,
  RESEARCH,
  IMAGE_LIBRARY,
}

const selectMenuItem = createAction(SELECT_MENU_ITEM, (selectedItem: MenuItemType) => ({ selectedItem }));

const createDefaultState = (): FluxDrawerMenu.IState => {
  return {
    selectedItem: MenuItemType.TEMPLATES,
  };
};

const handle = handleActions({
  SELECT_MENU_ITEM: (state: FluxDrawerMenu.IState, action): FluxDrawerMenu.IState => {
    return { ...state, ...action.payload };
  },
}, createDefaultState());

export namespace FluxDrawerMenu {
  export namespace IActionsPayload {
    export type onSelectMenuItemPayload = IActionPayload<{selectedItem: MenuItemType}>;
  }

  export interface IActions {
    selectMenuItem: (selectedItem: MenuItemType) => IActionsPayload.onSelectMenuItemPayload;
  }

  export const Actions: IActions = {
    selectMenuItem,
  };

  export interface IState {
    /**
     * Use for definitions selected item in menu.
     */
    selectedItem: MenuItemType;
  }

  export const reducer = handle;
}
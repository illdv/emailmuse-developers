/**
 * Types item menu.
 */
import { Action } from 'src/renderer/flux/interface';

export enum MenuItemType {
  ACCOUNT,
  TEMPLATES,
  IMAGE_LIBRARY,
  SNIPPETS,
}

export interface IDrawerMenuState {
  /**
   * Use for definitions selected item in menu.
   */
  selectedItem: MenuItemType;
}

export interface IDrawerMenuActions {
  /**
   * Use for definitions selected item in menu.
   */
  selectMenuItem: Action<{ selectedItem: MenuItemType }>;
}

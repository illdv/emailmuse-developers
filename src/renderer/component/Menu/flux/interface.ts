/**
 * Types item menu.
 */
import { CreateAction } from 'src/renderer/flux/interface';

export enum MenuItemType {
  ACCOUNT = 'ACCOUNT',
  EMAILS = 'EMAILS',
  IMAGE_LIBRARY = 'IMAGE_LIBRARY',
  SNIPPETS = 'SNIPPETS',
  LAYOUTS = 'LAYOUTS',
  SWIPE = 'SWIPE',
  TRAINING = 'TRAINING',
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
  selectMenuItem: CreateAction<{ selectedItem: MenuItemType }>;
}

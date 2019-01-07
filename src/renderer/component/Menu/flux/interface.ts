/**
 * Types item menu.
 */
import { CreateAction } from 'src/renderer/flux/interface';

export enum MenuItemType {
  account = 'account',
  help = 'help',
  emails = 'emails',
  image_library = 'image_library',
  snippets = 'snippets',
  layouts = 'layouts',
  swipes = 'swipes',
  training = 'training',
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

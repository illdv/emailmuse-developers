/**
 * Types item menu.
 */
import { CreateAction } from 'src/renderer/flux/interface';

export enum MenuItemType {
  ACCOUNT = 'ACCOUNT',
  HELP = 'HELP',
  EMAILS = 'EMAILS',
  IMAGE_LIBRARY = 'IMAGE_LIBRARY',
  SNIPPETS = 'SNIPPETS',
  LAYOUTS = 'LAYOUTS',
  SWIPES = 'SWIPES',
  TRAINING = 'TRAINING',
}

export enum Routes {
  emails = 'emails',
  editor = 'editor',
  imageLibrary = 'image library',
  snippets = 'snippets',
  layouts = 'layouts',
  swipes = 'swipes',
  swipesLocked = 'swipes locked',
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

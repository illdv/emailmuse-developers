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

export const enum Route {
  emails = 'Emails',
  editor = 'Editor',
  imageLibrary = 'Image library',
  snippets = 'Snippets',
  layouts = 'Layouts',
  swipes = 'Swipes',
  swipesLocked = 'Swipes locked',
  training = 'Training',
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

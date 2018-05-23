import { handleActions, createAction } from 'redux-actions';
import { IActionPayload } from 'src/renderer/flux/utils';
import payload = FluxBookmarks.IActionsPayload;

const SELECT_BOOKMARK  = 'SELECT_BOOKMARK';
const ADD_BOOKMARK          = 'ADD_BOOKMARK';

const selectBookmark = createAction(SELECT_BOOKMARK, (editBookmarkId?: string) => ({editBookmarkId}));
const createBookmark = createAction(ADD_BOOKMARK, (newBookmark: FluxBookmarks.IModel) => ({ newBookmark }));

const createDefaultState = (): FluxBookmarks.IState => {
  return {
    bookmarks: [],
  };
};

const handle = handleActions({
  SELECT_BOOKMARK: (state: FluxBookmarks.IState, action: payload.onOpenBookmarkEditorPayload): FluxBookmarks.IState => {
    return { ...state, selectedBookmarkId: action.payload.editBookmarkId };
  },
  ADD_BOOKMARK: (state: FluxBookmarks.IState, action: payload.onCreateBookmarkPayload): FluxBookmarks.IState => {
    return { ...state, bookmarks: [...state.bookmarks || [], action.payload.newBookmark] };
  },
}, createDefaultState());

export namespace FluxBookmarks {
  export namespace IActionsPayload {
    export type onOpenBookmarkEditorPayload = IActionPayload<{ editBookmarkId: string }>;
    export type onCreateBookmarkPayload = IActionPayload<{ newBookmark: IModel }>;
  }

  export interface IActions {
    selectBookmark: (editBookmarkId?: string) => IActionsPayload.onOpenBookmarkEditorPayload;
    createBookmark: () => IActionsPayload.onCreateBookmarkPayload;
  }

  export const Actions: IActions = {
    selectBookmark,
    createBookmark,
  };

  export interface IModel {
    id: string;
    title: string;
    url: string;
  }

  export interface IState {
    bookmarks: IModel[];
    selectedBookmarkId?: string;
  }

  export const reducer = handle;
}

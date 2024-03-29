import { createReducer } from 'redux-act';
import { IEmail } from 'src/renderer/component/Emails/flux/interfaceAPI';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { ISwipe } from 'src/renderer/component/Swipe/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';

export interface ISwipeState {
  email: IEmail;
  layout: ILayout;
  selectedSwipe: ISwipe;
  selectedSubject: IEmail;
  swipes: ISwipe[];
  isLoading: boolean;
  isCopied: boolean;
}

const initialState = (): ISwipeState => ({
  email: null,
  layout: null,
  selectedSwipe: null,
  selectedSubject: null,
  swipes: [],
  isLoading: false,
  isCopied: false,
});

const reducer = createReducer({}, initialState());

reducer.on(
  SwipeActions.loading.REQUEST,
  (state, payload): ISwipeState => ({
    ...state,
    isLoading: true,
  }),
);

reducer.on(
  SwipeActions.loading.SUCCESS,
  (state, payload): ISwipeState => ({
    ...state,
    ...payload,
    isLoading: false,
  }),
);

reducer.on(
  SwipeActions.moveSubjectInEmail.REQUEST,
  (state, payload): ISwipeState => ({
    ...state,
    ...payload,
  }),
);

reducer.on(
  SwipeActions.selectLayout.REQUEST,
  (state, payload): ISwipeState => ({
    ...state,
    ...payload,
  }),
);

reducer.on(
  SwipeActions.selectSubject.REQUEST,
  (state, payload): ISwipeState => ({
    ...state,
    ...payload,
  }),
);

reducer.on(
  SwipeActions.selectSwipe.REQUEST,
  (state, payload): ISwipeState => ({
    ...state,
    ...payload,
  }),
);

reducer.on(
  SwipeActions.resetSelected.REQUEST,
  (state, payload): ISwipeState => ({
    ...state,
    selectedSubject: null,
    selectedSwipe: null,
  }),
);

reducer.on(
  SwipeActions.copiedUrl.SUCCESS,
  (state): ISwipeState => ({
    ...state,
    isCopied: true,
  }),
);

reducer.on(
  DrawerMenuAction.selectMenuItem,
  (state, payload): ISwipeState => ({
    ...state,
    selectedSubject: null,
    selectedSwipe: null,
  }),
);

export default reducer;

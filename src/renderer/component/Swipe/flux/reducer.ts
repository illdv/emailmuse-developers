import { createReducer } from 'redux-act';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';
import { ISwipe } from 'src/renderer/component/Swipe/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';

export interface ISwipeState {
  email: ITemplate;
  layout: ILayout;
  selectedSwipe: ISwipe;
  selectedSubject: ITemplate;
}

const initialState = (): ISwipeState => ({
  email: null,
  layout: null,
  selectedSwipe: null,
  selectedSubject: null,
});

const reducer = createReducer({}, initialState());

reducer.on(SwipeActions.moveSubjectInEmail.REQUEST, (state, payload) => ({
  ...state,
  ...payload,
}));

reducer.on(SwipeActions.selectLayout.REQUEST, (state, payload) => ({
  ...state,
  ...payload,
}));

reducer.on(SwipeActions.selectSubject.REQUEST, (state, payload) => ({
  ...state,
  ...payload,
}));

reducer.on(SwipeActions.selectSwipe.REQUEST, (state, payload) => ({
  ...state,
  ...payload,
}));

reducer.on(SwipeActions.resetSelected.REQUEST, (state, payload) => ({
  ...state,
  selectedSubject: null,
  selectedSwipe: null,
}));

reducer.on(DrawerMenuAction.selectMenuItem, (state, payload) => ({
  ...state,
  selectedSubject: null,
  selectedSwipe: null,
}));

export default reducer;

import { createReducer } from 'redux-act';
import { ITemplate } from 'src/renderer/component/Templates/flux/interfaceAPI';
import { ILayout } from 'src/renderer/component/Layouts/flux/interface';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';

export interface ISwipeState {
  email: ITemplate;
  layout: ILayout;
}

const initialState = (): ISwipeState => ({
  email: null,
  layout: null,
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

export default reducer;

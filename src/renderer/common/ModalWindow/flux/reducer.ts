import { createReducer } from 'redux-act';

import { ModalWindowActions, ModalWindowType } from 'src/renderer/common/ModalWindow/flux/actions';

export interface IModalWindowState {
  type: ModalWindowType | null;
}

const initialState = (): IModalWindowState => ({
  type: null,
});

const reducer = createReducer({}, initialState());

reducer.on(ModalWindowActions.show.REQUEST, (state, payload): IModalWindowState => {
  return {...state, ...payload};
});

reducer.on(ModalWindowActions.show.SUCCESS, (state, payload): IModalWindowState => {
  return initialState();
});

reducer.on(ModalWindowActions.show.FAILURE, (state, payload): IModalWindowState => {
  return initialState();
});

reducer.on(ModalWindowActions.hide.REQUEST, (): IModalWindowState => {
  return initialState();
});

export default reducer;

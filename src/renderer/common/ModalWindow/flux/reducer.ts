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
  console.log('show.REQUEST');
  return {...state, ...payload};
});

reducer.on(ModalWindowActions.hide.REQUEST, (state, payload): IModalWindowState => {
  console.log('hide.REQUEST');
  return initialState();
});

export default reducer;

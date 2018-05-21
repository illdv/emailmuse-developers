import { handleActions, createAction } from 'redux-actions';

const SET_ERROR = 'SET_ERROR';
const CLEAR = 'CLEAR';

const setError = createAction(SET_ERROR, (error: string) => ({ error }));
const clear = createAction(CLEAR, () => ({ error: '' }));

const createDefaultState = (): FluxToast.IState => {
  return {
    error: '',
  };
};

const handle = handleActions({
  SET_ERROR: (state, action) => {
    return { ...state, ...action.payload };
  },
  CLEAR: (state, action) => {
    return { ...state, ...action.payload };
  }
}, createDefaultState());

export namespace FluxToast {

  export const Actions = {
    setError,
    clear,
  };

  export interface IState {
    error: string;
  }

  export const reducer = handle;
}

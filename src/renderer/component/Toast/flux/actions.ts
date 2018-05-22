import { handleActions, createAction } from 'redux-actions';

export enum ToastType {
  Error   = 'Error',
  Warning = 'Warning',
  Info    = 'Info',
  Success = 'Success',
}

const SHOW_TOAST  = 'SHOW_TOAST';
const CLEAR_TOAST = 'CLEAR_TOAST';

const showToast = createAction(
  SHOW_TOAST,
  (messages: string, type: ToastType = ToastType.Info) => ({ messages, type }));

const clear = createAction(CLEAR_TOAST);

const createDefaultState = (): FluxToast.IState => {
  return {
    messages: '',
    type: ToastType.Info,
    isOpen: false,
  };
};

const handle = handleActions({
  [SHOW_TOAST]: (state, action): FluxToast.IState => {
    return { ...state, ...action.payload, isOpen: true };
  },
  [CLEAR_TOAST]: () => {
    return createDefaultState();
  }
}, createDefaultState());

export namespace FluxToast {

  export const Actions = {
    showToast,
    clear,
  };

  export interface IState {
    messages: string;
    type: ToastType;
    isOpen: boolean;
  }

  export const reducer = handle;
}

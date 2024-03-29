import { createAction, handleActions } from 'redux-actions';
import { Action } from 'redux-act';

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
  [SHOW_TOAST]: (state: FluxToast.IState, action): FluxToast.IState => {
    return { ...state, ...action.payload, isOpen: true };
  },
  [CLEAR_TOAST]: (state: FluxToast.IState) => {
    return {
      ...state,
      isOpen: false,
    };
  },
}, createDefaultState());

export namespace FluxToast {

  export interface IActions {
    showToast: (messages: string, type?: ToastType) => Action<any>;
    clear: () => Action<any>;
  }

  export const Actions: IActions = {
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

import { handleActions, createAction } from 'redux-actions';
import { IActionPayload } from 'src/renderer/flux/utils';
import * as validate from 'validate.js';
import { IKeyValue } from 'src/renderer/utils';

export namespace FluxValidation {
  export namespace Actions {

    export const initScheme
                   = createAction('INIT_SCHEME', (validationScheme: object) => ({ validationScheme }));

    export const setValue
                   = createAction('SET_VALUE', (payload: IKeyValue<string, any>) => (payload));

    export const setScheme
                   = createAction('SET_SCHEME', (payload: IKeyValue<string, object>) => (payload));

    export interface IAllAction {
      initScheme?: (validationScheme: object) => IActionPayload<object>;
      setValue?: (payload: IKeyValue<string, any>) => IActionPayload<object>;
      setScheme?: (payload: IKeyValue<string, object>) => IActionPayload<object>;
    }

    export const AllAction: IAllAction = {
      initScheme,
      setValue,
      setScheme,
    };
  }

  export interface IState {
    validationScheme: object;
    resultValidation: object;
    isWasBlur: object;
    value: object;
    isValid: boolean;
  }

  const createDefaultState = (): IState => {
    return {
      validationScheme: {},
      value: {},
      resultValidation: {},
      isWasBlur: {},
      isValid: false,
    };
  };

  export const reducer = handleActions({
    INIT_SCHEME: (state: IState, action): IState => {
      return { ...state, ...action.payload };
    },
    SET_VALUE: (state: IState, action: IActionPayload<IKeyValue<string, any>>): IState => {
      const payload  = action.payload;
      const value    = newValue(state.value, payload.key, payload.value);
      const isBeBlur = newValue(state.isWasBlur, payload.key, true);

      const resultValidation = validate(value, state.validationScheme);
      return {
        ...state,
        value,
        resultValidation,
        isWasBlur: isBeBlur,
        isValid: resultValidation === undefined,
      };
    },
    SET_SCHEME: (state: IState, action: IActionPayload<IKeyValue<string, object>>): IState => {
      const payload          = action.payload;
      const value    = newValue(state.value, payload.key, '');
      const validationScheme = newValue(state.validationScheme, payload.key, payload.value);
      return {
        ...state,
        value,
        validationScheme,
        isValid: false,
      };
    },
  }, createDefaultState());
}

function newValue(old, id, value) {
  return { ...old, [id]: value };
}









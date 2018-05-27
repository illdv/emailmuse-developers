import * as validate from 'validate.js';
import { createAction, createReducer } from 'redux-act';

import { IKeyValue } from 'src/renderer/utils';
import { IValidationState } from 'src/renderer/common/Validation/flux/models';

const REDUCER = 'VALIDATION';
const NS      = `${REDUCER}__`;

export const INIT_SCHEME = `${NS}CLEAR_SCHEME`;
export const SET_SCHEME  = `${NS}SET_SCHEME`;
export const SET_VALUE   = `${NS}SET_VALUE`;

const clear     = createAction(INIT_SCHEME);
const setScheme = createAction(SET_SCHEME, (payload: IKeyValue<string, object>) => (payload));
const setValue  = createAction(SET_VALUE, (payload: IKeyValue<string, any>) => (payload));

export const ValidationActions = {
  clear,
  setValue,
  setScheme,
};

const initialState = (): IValidationState => {
  return {
    scheme: {},
    value: {},
    result: {},
    isWasBlur: {},
    isValid: false,
  };
};

const reducer = createReducer({}, initialState());

reducer.on(clear, () => (initialState()));

reducer.on(setScheme, (state, payload) => {
  const value            = newValue(state.value, payload.key, '');
  const validationScheme = newValue(state.scheme, payload.key, payload.value);

  return {
    ...state,
    value,
    scheme: validationScheme,
    isValid: false,
  };
});

reducer.on(setValue, (state, payload) => {
  const value     = newValue(state.value, payload.key, payload.value);
  const isWasBlur = newValue(state.isWasBlur, payload.key, true);

  const result = validate(value, state.scheme);

  return {
    ...state,
    value,
    result,
    isWasBlur,
    isValid: result === undefined,
  };
});

export const ValidationReducer = reducer;

function newValue(old, id, value) {
  return { ...old, [id]: value };
}

import { IKeyValue } from 'src/renderer/utils';
import { IActionPayload } from 'src/renderer/flux/utils';

export interface IValidationActions {
  clear?: () => IActionPayload<null>;
  setValue?: (payload: IKeyValue<string, any>) => IActionPayload<object>;
  setScheme?: (payload: IKeyValue<string, object>) => IActionPayload<object>;
}

export interface IValidationState {
  scheme: object;
  result: object;
  isWasBlur: object;
  value: object;
  isValid: boolean;
}
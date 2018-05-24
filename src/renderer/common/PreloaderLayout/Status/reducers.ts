import { handleActions } from 'redux-actions';
import * as constants from 'src/renderer/common/PreloaderLayout/Status/constants';

export namespace Status {
  export const reducer = (state: constants.TStatus = constants.LOADED, action): constants.TStatus => {
    if (action.meta && action.meta.status) {
      return action.meta.status;
    }
    else {
      return state;
    }
  };
}
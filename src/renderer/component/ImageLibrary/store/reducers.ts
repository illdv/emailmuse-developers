import { IFileInfo }from 'src/renderer/component/ImageLibrary/store/models';
import { handleActions } from 'redux-actions';

export namespace ImageLibrary {
  export interface IState {
    all: IFileInfo[];
  }

  const createDefaultState = (): IState => {
    return {
      all: []
    };
  };

  export const reducer = handleActions({
    GET_IMAGES_SUCCESS: (state: IState, action): IState => {
      return { ...state, ...action.payload };
    },
  }, createDefaultState());
}
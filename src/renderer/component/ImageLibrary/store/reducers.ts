import { IFileInfo }from 'src/renderer/component/ImageLibrary/store/models';
import { handleActions } from 'redux-actions';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';

export namespace ImageLibrary {
  export interface IState {
    all: IFileInfo[];
  }

  const createDefaultState = (): IState => {
    return {
      all: []
    };
  };

  export const reducer = handleActions(
    {
      [constants.GET_IMAGES_SUCCESS]: (state: IState, action): IState => {
        return { ...state, all: action.payload };
      },
    },
    createDefaultState()
  );
}
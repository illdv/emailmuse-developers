import { IFileInfo, IPagination }from 'src/renderer/component/ImageLibrary/store/models';
import { handleActions } from 'redux-actions';
import * as constants from 'src/renderer/component/ImageLibrary/store/constants';

export namespace ImageLibrary {
  export interface IState {
    all: IFileInfo[];
    pagination: IPagination;
  }

  const createDefaultState = (): IState => {
    return {
      all: [],
      pagination: {
        current_page: null,
        last_page: null,
        per_page: null,
        total: null
      },
    };
  };

  export const reducer = handleActions(
    {
      [constants.GET_IMAGES_SUCCESS]: (state: IState, action): IState => {
        return { ...state, all: action.payload.data,
          pagination: {
            current_page: action.payload.current_page,
            last_page: action.payload.last_page,
            per_page: action.payload.per_page,
            total: action.payload.total,
          }
        };
      },
    },
    createDefaultState()
  );
}
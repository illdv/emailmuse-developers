import { createReducer } from 'redux-act';
import { ITraining } from 'src/renderer/component/Training/flux/interface';
import { TrainingActions } from 'src/renderer/component/Training/flux/actions';

export interface ITrainingState {
  training: ITraining[];
  isLoading: boolean;
}

const initialState = (): ITrainingState => ({
  training: [],
  isLoading: false,
});

const reducer = createReducer({}, initialState());

reducer.on(TrainingActions.loading.REQUEST, (state, payload): ITrainingState => ({
  ...state,
  isLoading: true,
}));

reducer.on(TrainingActions.loading.SUCCESS, (state, payload): ITrainingState => ({
  ...state,
  ...payload,
  isLoading: false,
}));

reducer.on(TrainingActions.loading.FAILURE, (state, payload): ITrainingState => ({
  ...state,
  isLoading: false,
}));

export default reducer;

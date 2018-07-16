import { createActionCreator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';
import { ITraining } from 'src/renderer/component/Training/flux/interface';

const createAsyncAction = createActionCreator('TRAINING');

const loading = createAsyncAction('LOADING');

export const TrainingActions: ITrainingActions = {
  loading,
};

export interface ITrainingActions {
  loading: IAsyncAction2<{}, { training: ITraining[] }>;
}

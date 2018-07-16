import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';

function loading(): any {
  return AxiosWrapper.get('/parse-remote-json/training.json');
}

export const TrainingAPI = {
  loading,
};

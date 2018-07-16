import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';

function loading(): any {
  return AxiosWrapper.get('/parse-remote-json/test.json');
}

export const SwipeAPI = {
  loading,
};

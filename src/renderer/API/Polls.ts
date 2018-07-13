import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import { AxiosPromise } from 'axios';
import {
  ICreatePollsRequest,
  ICreatePollsResponse, ISavePollRequest,
  IUpdatePollsRequest,
} from 'src/renderer/component/Profile/Polls/flux/interfase';

/// Admin API
function getPolls(): AxiosPromise<ICreatePollsResponse> {
  return AxiosWrapper.get('/polls');
}

function updatePoll(pollId: string, request: IUpdatePollsRequest): any {
  return AxiosWrapper.put(`/polls/${pollId}`, request);
}

function deletePoll(pollId: string): any {
  return AxiosWrapper.deleteResponse2(`/polls/${pollId}`);
}

function createPolls(request: ICreatePollsRequest): any {
  return AxiosWrapper.post('/polls', request);
}

// User API
// Default value need for standard poll
function getPoll(pollId = '1'): any {
  return AxiosWrapper.get(`/polls/1`);
}

function savePoll(request: ISavePollRequest): any {
  return AxiosWrapper.post(`/answers`, request);
}

export const PollsAPI = {
  getPolls,
  savePoll,
  getPoll,
  createPolls,
  updatePoll,
  deletePoll,
};

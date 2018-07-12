import { AxiosWrapper } from 'src/renderer/API/AxiosWrapper';
import { AxiosPromise } from 'axios';
import {
  ICreatePollsRequest,
  ICreatePollsResponse,
  IUpdatePollsRequest,
} from 'src/renderer/component/Profile/Polls/flux/interfase';

/// Admin API
function getPolls(): AxiosPromise<ICreatePollsResponse> {
  return AxiosWrapper.get('/polls');
}

function updatePoll(pollId: string, request: IUpdatePollsRequest): AxiosPromise {
  return AxiosWrapper.put(`/polls/${pollId}`, request);
}

function deletePoll(pollId: string): AxiosPromise {
  return AxiosWrapper.deleteResponse2(`/polls/${pollId}`);
}

function createPolls(request: ICreatePollsRequest): AxiosPromise {
  return AxiosWrapper.post('/polls', request);
}

// User API
// Default value need for standard poll
function getPoll(pollId = '1'): AxiosPromise {
  return AxiosWrapper.get(`/polls/${pollId}`);
}

function savePoll(pollId: string, request: IUpdatePollsRequest): AxiosPromise {
  return AxiosWrapper.put(`/polls/${pollId}`, request);
}

export const PollsAPI = {
  getPolls,
  createPolls,
  getPoll,
  updatePoll,
  deletePoll,
  savePoll,
};

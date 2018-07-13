export interface IPoll {
  title: string;
  description: string;
  questions: IQuestion[];
}

export interface IQuestion {
  title: string;
  description: string;
  answers: IAnswer[];
}

export interface IAnswer {
  id: number;
  body: string;
}

export interface ICreatePollsRequest extends IPoll {
}

export interface ICreatePollsResponse extends IPoll {
}

export interface ISavePollRequest {
  answers: string[];
}

export interface IUpdatePollsRequest {
  title: string;
  description: string;
}

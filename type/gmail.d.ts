/**
 * Gmail API model.
 */
declare namespace GMail {
  export interface IHeader {
    name: string;
    value: string;
  }

  export interface IBody {
    size: number;
    data: string;
  }

  export interface IPayload {
    partId: string;
    mimeType: string;
    filename: string;
    headers: IHeader[];
    body: IBody;
    parts: IPart[];
  }

  export interface IPart {
    partId: string;
    mimeType: string;
    filename: string;
    headers: IHeader[];
    body: IBody;
  }

  export interface IMailData {
    id: string;
    threadId: string;
    labelIds: string[];
    snippet: string;
    historyId: string;
    internalDate: string;
    payload: IPayload;
    sizeEstimate: number;
  }

  export interface IResponseValue {
    id: string,
    result: IMailData
  }

  export interface IMailResponse {
    [key: string]: IResponseValue
  }

  /**
   * Users: getProfile
   */
  export interface IProfileResponse {
    emailAddress: string,
    messagesTotal: number,
    threadsTotal: number,
    historyId: string
  }
}

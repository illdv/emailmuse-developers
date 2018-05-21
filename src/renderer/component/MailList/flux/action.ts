import { handleActions, createAction } from 'redux-actions';
import { Action } from 'redux';

import { LabelsType, IMailView } from 'src/renderer/component/MailList/flux/saga/selectors';

const SELECT_COMPOSE_MAIL  = 'SELECT_COMPOSE_MAIL';
const ADD_MAIL             = 'ADD_MAIL';
const SELECT_MAIL          = 'SELECT_MAIL';
const SET_MAIL             = 'SET_MAIL';
const SET_VISIBILITY_LABEL = 'SET_VISIBILITY_LABEL';

const LOAD_EMAIL_REQUEST = 'LOAD_EMAIL_REQUEST';
const LOAD_EMAIL_SUCCESS = 'LOAD_EMAIL_SUCCESS';
const LOAD_EMAIL_FAILURE = 'LOAD_EMAIL_FAILURE';

export const SEND_MAIL_REQUEST = 'SEND_MAIL_REQUEST';
const SEND_MAIL_SUCCESS = 'SEND_MAIL_SUCCESS';
const SEND_MAIL_FAILURE = 'SEND_MAIL_FAILURE';

/**
 * Specifies for what mail is selected.
 */
export enum SelectedType {
  VIEW,
  COMPOSE,
}

const selectMail = createAction(SELECT_MAIL, (selectedMailId: string, selectedType: SelectedType) => ({
  selectedMailId,
  selectedType
}));

const addMail    = createAction(ADD_MAIL, (newMail: IMailView) => ({ newMail }));
const setMail    = createAction(SET_MAIL, (newMail: IMailView) => ({ newMail }));
const setLabel   = createAction(SET_VISIBILITY_LABEL, (visibilityLabel = LabelsType.INBOX) => ({ visibilityLabel }));

const sendMail: ISendMail = {
  REQUEST: createAction(SEND_MAIL_REQUEST, (mailId: string) => ({ mailId })),
  SUCCESS: createAction(SEND_MAIL_SUCCESS, (mailId: string) => ({ mailId })),
  FAILURE: createAction(SEND_MAIL_FAILURE, (error, mailId: string) => ({ error, mailId })),
};

const loadMail: ILoadingMail = {
  REQUEST: createAction(LOAD_EMAIL_REQUEST),
  SUCCESS: createAction(LOAD_EMAIL_SUCCESS, (mailViews) => ({ mailViews, error: null })),
  FAILURE: createAction(LOAD_EMAIL_FAILURE, (error) => ({ error, mailViews: null, })),
};

interface ILoadingMail {
  REQUEST: () => Action;
  SUCCESS: (mails: any[]) => Action;
  FAILURE: (error: any) => Action;
}

interface ISendMail {
  REQUEST: (mailId: string) => Action;
  SUCCESS: (mailId: string) => Action;
  FAILURE: (error, mailId: string) => Action;
}

const createDefaultState = (): FluxMail.IState => {
  return {
    mailViews: [],
    error: '',
    visibilityLabel: LabelsType.INBOX,
    selectedMailId: null,
    selectedType: SelectedType.VIEW,
  };
};

function setMailInState(newMail: IMailView, state: FluxMail.IState) {
  return state.mailViews.map((oldMail) => {
    if (oldMail.id === newMail.id) {
      return newMail;
    }
    return oldMail;
  });
}

const handle = handleActions({
  LOAD_EMAIL_SUCCESS: (state, action): FluxMail.IState => {
    return { ...state, mailViews: [...state.mailViews || [], ...action.payload.mailViews] };
  },
  LOAD_EMAIL_FAILURE: (state, action): FluxMail.IState => {
    return { ...state, ...action.payload };
  },
  SET_VISIBILITY_LABEL: (state, action): FluxMail.IState => {
    return { ...state, ...action.payload, selectedMailId: null };
  },
  SELECT_MAIL: (state, action): FluxMail.IState => {
    return { ...state, ...action.payload };
  },
  ADD_MAIL: (state: FluxMail.IState, action): FluxMail.IState => {
    return { ...state, mailViews: [...state.mailViews || [], action.payload.newMail] };
  },
  SEND_MAIL_SUCCESS: (state: FluxMail.IState, action): FluxMail.IState => {
    const mailId   = action.payload.mailId;
    const findMail = state.mailViews.find((mail) => mail.id === mailId);
    if (!findMail) {
      throw new Error(`Failed handling ${SEND_MAIL_REQUEST}. Not find mailId = ${mailId}`);
    }
    findMail.labelsType = [LabelsType.SEND_MAIL];
    const updateMails   = setMailInState(findMail, state);
    return { ...state, mailViews: updateMails, selectedMailId: null };
  },
  SET_MAIL: (state: FluxMail.IState, action: { payload: { newMail: IMailView } }): FluxMail.IState => {
    const updateMails = setMailInState(action.payload.newMail, state);
    return { ...state, mailViews: updateMails };
  },
}, createDefaultState());


export namespace FluxMail {
  interface IActions {
    loadMail: ILoadingMail;
    setMail: (newMail: IMailView) => any;
    addMail: (newMail: IMailView) => any;
    setLabel: (visibilityLabel: LabelsType) => any;
    selectMail: (selectedMailId: string, selectedType: SelectedType) => any;
    sendMail: ISendMail;
  }

  export const Actions: IActions = {
    loadMail,
    setLabel,
    setMail,
    selectMail,
    addMail,
    sendMail,
  };

  export interface IState {
    error: string;
    selectedMailId: string;
    mailViews: IMailView[];
    visibilityLabel: LabelsType;
    selectedType: SelectedType;
  }

  export const reducer = handle;
}
import { createActionGenerator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';

const createAsyncAction = createActionGenerator('MODAL_WINDOW');

export enum ModalWindowType {
  SelectLayout   = 'SelectLayout',
  NeedInsertBody = 'NeedInsertBody',
  CreateFolder = 'CreateFolder',
  ConfirmationCloseEditor = 'ConfirmationCloseEditor',
}

const show = createAsyncAction('SHOW');
const hide = createAsyncAction('HIDE');

export const ModalWindowActions: IModalWindowActions = {
  show,
  hide,
};

export interface IModalWindowActions {
  show: IAsyncAction2<{ type: ModalWindowType }, {}>;
  hide: IAsyncAction2<{}, {}>;
}

import { createActionCreator } from 'src/renderer/flux/utils';
import { IAsyncAction2 } from 'src/renderer/flux/interface';

const createAsyncAction = createActionCreator('MODAL_WINDOW');

export enum ModalWindowType {
  Type1 = 'Type1',
  Type2 = 'Type2',
}

const show = createAsyncAction('SHOW');
const hide = createAsyncAction('HIDE');

export const ModalWindowActions: IModalWindowActions = {
  show,
  hide,
};

export interface IModalWindowActions {
  show: IAsyncAction2<{ type: ModalWindowType }, {}>;
  hide: IAsyncAction2<{ type: ModalWindowType }, {}>;
}

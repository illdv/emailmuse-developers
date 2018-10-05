import { createAction, createReducer } from 'redux-act';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { MenuItemType } from 'src/renderer/component/Menu/flux/interface';

export interface ITutorialState {
  name: MenuItemType;
  run: boolean;
}

const initialState: ITutorialState = ({
  name: MenuItemType.EMAILS,
  run: true,
});

export const RUN_TUTORIAL = 'RUN_TUTORIAL';

export const runTutorial = createAction(RUN_TUTORIAL, (payload: {}) => (payload));

const reducer = createReducer({}, initialState);

reducer.on(DrawerMenuAction.selectMenuItem, (state, payload): ITutorialState => ({
  ...state,
  name: payload.selectedItem,
  run: false,
}));

reducer.on(runTutorial, (state): ITutorialState => ({ ...state, run: true }));

export default reducer;

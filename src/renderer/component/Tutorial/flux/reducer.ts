import { createAction, createReducer } from 'redux-act';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { MenuItemType } from 'src/renderer/component/Menu/flux/interface';
import { AuthorisationActions } from 'src/renderer/component/Profile/Authorisation/flux/actions';
import { isFirstTime } from 'src/renderer/common/isFirstTime';

export interface ITutorialState {
  name: MenuItemType;
  run: boolean;
}

const initialState: ITutorialState = {
  name: isFirstTime() === 0 ? MenuItemType.snippets : MenuItemType.emails,
  run: false,
};

export const RUN_TUTORIAL = 'RUN_TUTORIAL';

export const runTutorial = createAction(RUN_TUTORIAL, (payload: {}) => payload);

const reducer = createReducer({}, initialState);

reducer.on(
  DrawerMenuAction.selectMenuItem,
  (state, payload): ITutorialState => ({
    ...state,
    name: payload.selectedItem,
    run: false,
  }),
);

reducer.on(
  AuthorisationActions.logout.REQUEST,
  (state): ITutorialState => ({
    ...state,
    run: false,
  }),
);

reducer.on(runTutorial, (state): ITutorialState => ({ ...state, run: true }));

export default reducer;

import { createReducer } from 'redux-act';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import { IEditEntity } from 'src/renderer/component/Editor/flux/interface';
import { EmailActions } from 'src/renderer/component/Emails/flux/module';
import { SnippetsAction } from 'src/renderer/component/Snippets/flux/actions';

export interface IEditorState {
  editEntity: IEditEntity;
}

const initialState = (): IEditorState => ({
  editEntity: null,
});

const reducer = createReducer({}, initialState());

reducer.on(EditorActions.edit.REQUEST, (state, payload): IEditorState => ({
  ...state,
  editEntity: {
    ...payload,
    html: payload.html || ' ',
  },
}));

reducer.on(EmailActions.createSuccess, (state, payload): IEditorState => ({
  ...state,
  editEntity: {
    ...state.editEntity,
    id: payload[0].id,
  },
}));

reducer.on(SnippetsAction.add.SUCCESS, (state, payload): IEditorState => ({
  ...state,
  editEntity: {
    ...state.editEntity,
    id: payload.snippet.id.toString(),
  },
}));

export default reducer;

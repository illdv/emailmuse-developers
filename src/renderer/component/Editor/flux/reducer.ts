import { createReducer } from 'redux-act';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import { IEditEntity } from 'src/renderer/component/Editor/flux/interface';
import { TemplateActions } from 'src/renderer/component/Templates/flux/module';

export interface IEditorState {
  editEntity: IEditEntity;
}

const initialState = (): IEditorState => ({
  editEntity: null,
});

const reducer = createReducer({}, initialState());

reducer.on(EditorActions.edit.REQUEST, (state, payload) => ({
  ...state,
  ...payload,
}));

reducer.on(TemplateActions.createSuccess, (state, payload) => ({
  ...state,
  editEntity: {
    ...state.editEntity,
    id: payload[0].id,
  },
}));

export default reducer;

import { createReducer } from 'redux-act';
import { EditorActions } from 'src/renderer/component/Editor/flux/actions';
import { IEditEntity } from 'src/renderer/component/Editor/flux/interface';
import { TemplateActions } from 'src/renderer/component/Templates/flux/module';
import { SwipeActions } from 'src/renderer/component/Swipe/flux/actions';

export interface IEditorState {
  editEntity: IEditEntity;
  bodyForInsert: string;
}

const initialState = (): IEditorState => ({
  editEntity: null,
  bodyForInsert: null,
});

const reducer = createReducer({}, initialState());

reducer.on(EditorActions.edit.REQUEST, (state, payload) => ({
  ...state,
  editEntity: payload,
}));

reducer.on(TemplateActions.createSuccess, (state, payload) => ({
  ...state,
  editEntity: {
    ...state.editEntity,
    id: payload[0].id,
  },
  bodyForInsert: null,
}));

reducer.on(SwipeActions.needInsertBody.REQUEST, (state, payload) => ({
  ...state,
  bodyForInsert: payload.body,
}));

reducer.on(TemplateActions.save, (state, payload) => ({
  ...state,
  bodyForInsert: null,
}));

export default reducer;

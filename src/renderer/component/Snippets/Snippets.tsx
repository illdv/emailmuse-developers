import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Fade, Paper } from '@material-ui/core';
import { connect, Dispatch } from 'react-redux';
import { Add } from '@material-ui/icons';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ISnippetsAction, ISnippetsState } from 'src/renderer/component/Snippets/flux/interface';
import { ListTable } from 'src/renderer/common/List/ListTable/ListTable';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { Fab } from 'src/renderer/common/Fab';
import { createEmptySnippet, snippetToEditEntity, snippetToItem } from 'src/renderer/component/Snippets/utils';
import { ActionStatus } from 'src/renderer/flux/interface';
import { SnippetsAction } from 'src/renderer/component/Snippets/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { EditorActions, IEditorActions } from 'src/renderer/component/Editor/flux/actions';

export namespace SnippetsSpace {
  export interface IState {
  }

  export interface IProps {
    actions?: ISnippetsAction;
    snippets?: ISnippetsState;
    editorActions?: IEditorActions;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  snippets: state.snippets,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: {
    loading: bindActionCreators(SnippetsAction.loading, dispatch),
    add: bindActionCreators(SnippetsAction.add, dispatch),
    edit: bindActionCreators(SnippetsAction.edit, dispatch),
    remove: bindActionCreators(SnippetsAction.remove, dispatch),
  },
  editorActions: bindModuleAction(EditorActions, dispatch),
});

@(connect(mapStateToProps, mapDispatchToProps))
export class Snippets extends Component<SnippetsSpace.IProps, SnippetsSpace.IState> {

  state: SnippetsSpace.IState = {};

  componentDidMount(): void {
    this.props.actions.loading.REQUEST({});
  }

  onChangePage = (event, page: number) => {
    this.props.actions.loading.REQUEST({ page: page + 1 });
  }

  onSelect = (snippet: ISnippet) => () => {
    this.props.editorActions.edit.REQUEST(snippetToEditEntity(snippet));
  }

  selectNew = () => {
    const emptySnippet = createEmptySnippet();
    this.props.editorActions.edit.REQUEST(snippetToEditEntity(emptySnippet));
  }

  renderContent = () => {
    const { status, snippets, pagination } = this.props.snippets;

    /*const isFirstSwipe = true;

    if (isFirstSwipe) {
      return (
        <div>
          <InCenter>
            <Typography variant='title' noWrap>
              Let's create a "snippet" you can use over and over
              in your email to save time.
            </Typography>
            <Fab
              onClick={this.selectNew}
              icon={<Add/>}
              position={0}
              title={'Add a new snippet'}
              whitCtrl
              hotKey={'A'}
            />
          </InCenter>
        </div>
      );
    }*/

    return (
      <div>
        <ListTable
          title='Snippets'
          entities={snippets}
          toItem={snippetToItem}
          onOpenItem={this.onSelect}
          pagination={pagination}
          onChangePage={this.onChangePage}
          isLoading={status === ActionStatus.REQUEST}
        />
        <Fab
          onClick={this.selectNew}
          icon={<Add/>}
          position={0}
          title={'Add a new snippet'}
          whitCtrl
          hotKey={'A'}
        />
      </div>
    );
  }

  render() {
    return (
      <Fade in timeout={1000}>
        <Paper elevation={4} className={'template-list'}>
          {this.renderContent()}
        </Paper>
      </Fade>
    );
  }
}

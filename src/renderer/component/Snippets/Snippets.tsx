import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { CircularProgress, Fade, Paper, Typography } from '@material-ui/core';
import { connect, Dispatch } from 'react-redux';
import { Add } from '@material-ui/icons';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ISnippetsState } from 'src/renderer/component/Snippets/flux/interface';
import { ListTable } from 'src/renderer/common/List/ListTable/ListTable';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { Fab } from 'src/renderer/common/Fab';
import { createEmptySnippet, snippetToEditEntity, snippetToItem } from 'src/renderer/component/Snippets/utils';
import { ActionStatus } from 'src/renderer/flux/interface';
import { ISnippetsAction, SnippetsAction } from 'src/renderer/component/Snippets/flux/actions';
import { bindModuleAction } from 'src/renderer/flux/saga/utils';
import { EditorActions, IEditorActions } from 'src/renderer/component/Editor/flux/actions';
import Flex from 'src/renderer/common/Flex';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import { useOrDefault } from 'src/renderer/utils';
import InCenter from 'src/renderer/common/InCenter';

export namespace SnippetsSpace {
  export interface IState {
    videoLoading: boolean;
  }

  export interface IProps {
    actions?: ISnippetsAction;
    snippets?: ISnippetsState;
    profile?: IProfileState;
    editorActions?: IEditorActions;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  snippets: state.snippets,
  profile: state.profile,
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

  state: SnippetsSpace.IState = {
    videoLoading: true,
  };

  componentDidMount(): void {
    this.props.actions.loading.REQUEST({});
  }

  onChangePage = (event, page: number) => {
    this.props.actions.loading.REQUEST({ page: page + 1 });
  }

  onSelect = (snippet: ISnippet) => () => {
    this.props.editorActions.edit.REQUEST(snippetToEditEntity(snippet));
  }

  onLoadVideo = () => {
    this.setState({
      videoLoading: false,
    });
  }

  selectNew = () => {
    const emptySnippet = createEmptySnippet();
    this.props.editorActions.edit.REQUEST(snippetToEditEntity(emptySnippet));
  }

  renderIfNotSnippet = () => (
    <Paper style={{ height: '100%' }}>
      <Flex
        direction={'column'}
        justify={'center'}
        alignItems={'center'}
      >
        <Typography variant='title'>
          <p>
            Let's create a "snippet" you can use <br/>
            over and over in your email to save time.
          </p>
        </Typography>
        <Fab
          onClick={this.selectNew}
          icon={<Add/>}
          position={0}
          title={'Add a new snippet'}
          whitCtrl
          hotKey={'A'}
          isFly={false}
        />
        <div style={{ width: 560, height: 315, paddingTop: 20 }}>
          <iframe
            style={{ width: '100%', height: '100%' }}
            hidden={this.state.videoLoading}
            src='https://www.youtube.com/embed/eSdoidIMGNk'
            onLoad={this.onLoadVideo}
          />
          {
            this.state.videoLoading &&
            <InCenter>
              <CircularProgress
                style={{
                  padding: 'auto',
                  marginTop: -100,
                  marginLeft: -40,
                }}
                size={60}
              />
            </InCenter>
          }
        </div>
      </Flex>
    </Paper>
  )

  renderContent = () => {
    const { status, snippets, pagination } = this.props.snippets;

    if (status === ActionStatus.SUCCESS && useOrDefault(() => snippets.length, 0) === 0) {
      return this.renderIfNotSnippet();
    }

    return (
      <Paper>
        {
          <ListTable
            title='Snippets'
            entities={snippets}
            toItem={snippetToItem}
            onOpenItem={this.onSelect}
            pagination={pagination}
            onChangePage={this.onChangePage}
            isLoading={status === ActionStatus.REQUEST}
          />
        }
        <Fab
          onClick={this.selectNew}
          icon={<Add/>}
          position={0}
          title={'Add a new snippet'}
          whitCtrl
          hotKey={'A'}
        />
      </Paper>
    );
  }

  render() {
    return (
      <Fade in timeout={1000}>
        {this.renderContent()}
      </Fade>
    );
  }
}

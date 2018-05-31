import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Paper } from '@material-ui/core';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ISnippetsAction, ISnippetsState } from 'src/renderer/component/Snippets/flux/interface';
import { ICustomItem, ListElement } from 'src/renderer/common/List/ListElement';
import { bindActionCreators } from 'redux';
import { SnippetsAction } from 'src/renderer/component/Snippets/flux/module';
import { ActionStatus } from 'src/renderer/flux/utils';
import { Loading } from 'src/renderer/common/Loading';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';

export namespace SnippetsSpace {
  export interface IState {

  }

  export interface IProps {
    actions?: ISnippetsAction;
    snippets?: ISnippetsState;
  }
}

const mapStateToProps = (state: IGlobalState) => ({
  snippets: state.snippets,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators({
    ...SnippetsAction,
  }, dispatch),
});

@(connect(mapStateToProps, mapDispatchToProps))
export class Snippets extends Component<SnippetsSpace.IProps, SnippetsSpace.IState> {

  state = {};

  componentDidMount(): void {
    this.props.actions.loading();
  }

  onSelectSnippet = (snippet: ISnippet) => () => {
    console.log('Select ', snippet);
  }

  toItem = (snippet: ISnippet): ICustomItem => {
    return {
      id: snippet.id.toString(),
      title: snippet.shortcut,
      description: snippet.description,
      rightText: snippet.updated_at,
    };
  }

  onChangePage = (event, page: number): void => {
    console.log('Change page');
  }

  render() {
    const { snippet, status, pagination } = this.props.snippets;

    if (status === ActionStatus.LOADING) {
      return <Loading/>;
    }

    return (
      <Paper elevation={4} className={'template-list'}>
        <ListElement
          entities={snippet}
          toItem={this.toItem}
          selectItem={this.onSelectSnippet}
          pagination={pagination}
          onChangePage={this.onChangePage}
        />
      </Paper>
    );
  }
}

import * as React from 'react';
import { Component } from 'react';
import { bindActionCreators } from 'redux';
import { Paper } from '@material-ui/core';
import { connect, Dispatch } from 'react-redux';
import { Add } from '@material-ui/icons';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { SnippetsAction } from 'src/renderer/component/Snippets/flux/module';
import { ISnippetsAction, ISnippetsState } from 'src/renderer/component/Snippets/flux/interface';
import { Loading } from 'src/renderer/common/Loading';
import { ListElement } from 'src/renderer/common/List/ListElement';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { SnippetsEditor } from 'src/renderer/component/Snippets/SnippetsEditor';
import { Fab } from 'src/renderer/common/Fab';
import { snippetToItem } from 'src/renderer/component/Snippets/utils';
import { ActionStatus } from 'src/renderer/flux/interface';

export namespace SnippetsSpace {
  export interface IState {
    select?: ISnippet;
    isNew: boolean;
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
  actions: {
    loading: bindActionCreators(SnippetsAction.loading, dispatch),
    add: bindActionCreators(SnippetsAction.add, dispatch),
    edit: bindActionCreators(SnippetsAction.edit, dispatch),
    remove: bindActionCreators(SnippetsAction.remove, dispatch),
  },
});

@(connect(mapStateToProps, mapDispatchToProps))
export class Snippets extends Component<SnippetsSpace.IProps, SnippetsSpace.IState> {

  state = {
    select: null,
    isNew: false,
  };

  componentDidMount(): void {
    this.props.actions.loading.REQUEST({});
  }

  onChangePage = (event, page: number) => {
    this.props.actions.loading.REQUEST({ page: page + 1 });
  }

  onSelect = (snippet: ISnippet) => () => {
    this.setState({
      select: snippet,
    });
  }

  onClose = () => {
    this.setState({
      select: null,
    });
  }

  onRemove = () => {
    const select = this.state.select;
    this.props.actions.remove.REQUEST({ id: select.id });
    this.onClose();
  }

  onSave = (newSnippet: ISnippet) => {
    if (this.state.isNew) {
      this.props.actions.add.REQUEST({ snippet: newSnippet });
    } else {
      this.props.actions.edit.REQUEST({ snippet: newSnippet });
    }
    this.setState({
      select: null,
      isNew: false,
    });
  }

  onEditNew = () => {
    this.setState({
      isNew: true,
      select: {
        user_id: -1,
        id: -1,
        shortcut: '',
        description: '',
        body: '',
        updated_at: '',
        created_at: '',
      },
    });
  }

  render() {

    const { status, snippets, pagination } = this.props.snippets;

    const selectSnippet = this.state.select;

    if (selectSnippet) {
      return (
        <SnippetsEditor
          onRemove={this.onRemove}
          onClose={this.onClose}
          snippet={selectSnippet}
          onSave={this.onSave}
        />
      );
    }

    if (status === ActionStatus.REQUEST) {
      return <Loading/>;
    }

    return (
      <Paper elevation={4} className={'template-list'}>
        <ListElement
          entities={snippets}
          toItem={snippetToItem}
          selectItem={this.onSelect}
          pagination={pagination}
          onChangePage={this.onChangePage}
        />
        <Fab
          onClick={this.onEditNew}
          icon={<Add/>}
          position={0}
        />
      </Paper>
    );
  }
}

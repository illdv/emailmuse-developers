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
import { createEmptySnippet, snippetToItem } from 'src/renderer/component/Snippets/utils';
import { ActionStatus } from 'src/renderer/flux/interface';

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
  actions: {
    loading: bindActionCreators(SnippetsAction.loading, dispatch),
    add: bindActionCreators(SnippetsAction.add, dispatch),
    edit: bindActionCreators(SnippetsAction.edit, dispatch),
    remove: bindActionCreators(SnippetsAction.remove, dispatch),
    selectSnippet: bindActionCreators(SnippetsAction.selectSnippet, dispatch),
    saveAndClose: bindActionCreators(SnippetsAction.saveAndClose, dispatch),
  },
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
    this.props.actions.selectSnippet({ selectSnippet: snippet });
  }

  onClose = () => {
    this.props.actions.selectSnippet({ selectSnippet: null });
  }

  onRemove = () => {
    const selectSnippet = this.props.snippets.selectSnippet;
    this.props.actions.remove.REQUEST({ id: selectSnippet.id.toString() });
  }

  onSave = (newSnippet: ISnippet, saveAndClose: boolean) => {
    if (saveAndClose) {
      this.props.actions.saveAndClose({ snippet: newSnippet });
    }
    this.props.actions.edit.REQUEST({ snippet: newSnippet });
  }

  onCreate = (newSnippet: ISnippet) => {
    this.props.actions.add.REQUEST({ snippet: newSnippet });
  }

  selectNew = () => {
    this.props.actions.selectSnippet({ selectSnippet: createEmptySnippet() });
  }

  /**
   * New means that has not yet been created.
   */
  isNewSnippet = (): boolean => {
    return this.props.snippets.selectSnippet.id === null;
  }

  showEditOrCreateSnippet = () => {
    const selectSnippet = this.props.snippets.selectSnippet;

    if (this.isNewSnippet()) {
      return (
        <SnippetsEditor
          onRemove={this.onClose}
          onClose={this.onClose}
          snippet={selectSnippet}
          onSave={this.onCreate}
        />
      );
    } else {
      return (
        <SnippetsEditor
          onRemove={this.onRemove}
          onClose={this.onClose}
          snippet={selectSnippet}
          onSave={this.onSave}
        />
      );
    }
  }

  render() {

    const { status, snippets, pagination } = this.props.snippets;

    if (this.props.snippets.selectSnippet) {
      return this.showEditOrCreateSnippet();
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
          onClick={this.selectNew}
          icon={<Add/>}
          position={0}
        />
      </Paper>
    );
  }
}

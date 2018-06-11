import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import block from 'bem-ts';
import { bindActionCreators } from 'redux';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ListElement } from 'src/renderer/common/List/ListElement';
import { SnippetsAction } from 'src/renderer/component/Snippets/flux/module';
import { ISnippetsAction, ISnippetsState } from 'src/renderer/component/Snippets/flux/interface';
import { snippetToItem } from 'src/renderer/component/Snippets/utils';
import { ISnippet } from 'src/renderer/component/Snippets/flux/interfaceAPI';
import { Search } from 'src/renderer/common/Search';

import './DialogInsertSnippet.scss';

// TODO: fix name on dialogs-select-snippet
const b = block('dialogs-select-image');

export namespace DialogInsertSnippetSpace {
  export interface IState {
    searchWord: string;
  }

  export interface IProps {
    isOpen: boolean;
    handleClose: () => void;
    insertHTML: (url: string, callback: () => void) => void;
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
export class DialogInsertSnippet extends Component<DialogInsertSnippetSpace.IProps, DialogInsertSnippetSpace.IState> {

  state: DialogInsertSnippetSpace.IState = { searchWord: '' };

  componentDidMount(): void {
    if (!this.props.snippets.snippets) {
      this.props.actions.loading.REQUEST({});
    }
  }

  onChangePage = (event, page: number) => {
    this.props.actions.loading.REQUEST({ page: page + 1, shortcut: this.state.searchWord });
  }

  onSelect = (snippet: ISnippet) => () => {
    this.props.insertHTML(snippet.body, this.props.handleClose);
    this.props.actions.loading.REQUEST({});
  }

  onLoadingSnippet = (searchWord: string) => {
    this.props.actions.loading.REQUEST({ shortcut: searchWord });
    this.setState({ searchWord });
  }

  onClose = () => {
    this.props.handleClose();
    this.props.actions.loading.REQUEST({});
  }

  render() {
    const { isOpen, snippets } = this.props;
    return (
      <Dialog
        className={b('dialog')}
        open={isOpen}
        onClose={this.onClose}
        maxWidth={false}
      >
        <DialogTitle id='form-dialog-title'>Select Snippet</DialogTitle>
        <DialogContent>
          <Search search={this.onLoadingSnippet}/>
          <div className={b('container')}>
            <ListElement
              entities={snippets.snippets}
              toItem={snippetToItem}
              selectItem={this.onSelect}
              pagination={snippets.pagination}
              onChangePage={this.onChangePage}
            />
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

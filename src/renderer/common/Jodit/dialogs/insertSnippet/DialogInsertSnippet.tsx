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

import './DialogInsertSnippet.scss';

const b = block('dialogs-select-image');

export namespace DialogInsertSnippetSpace {
  export interface IState {

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

  state = {};

  componentDidMount(): void {
    if (!this.props.snippets.snippets) {
      this.props.actions.loading.REQUEST({ page: 1 });
    }
  }

  onChangePage = (event, page: number) => {
    this.props.actions.loading.REQUEST({ page: page + 1 });
  }

  onSelect = (snippet: ISnippet) => () => {
    this.props.insertHTML(snippet.body, this.props.handleClose);
  }

  render() {
    const { isOpen, handleClose, snippets } = this.props;
    return (
      <Dialog
        className={b('dialog')}
        open={isOpen}
        onClose={handleClose}
        maxWidth={false}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='form-dialog-title'>Select Snippet</DialogTitle>
        <DialogContent>
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

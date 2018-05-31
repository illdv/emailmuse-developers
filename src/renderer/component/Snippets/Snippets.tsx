import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Paper } from '@material-ui/core';

import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { ISnippet } from 'src/renderer/component/Snippets/flux/modules';
import { ICustomItem, ListElement } from 'src/renderer/common/List/ListElement';

const testData: ISnippet[] = [
  { id: '1', code: ':snippet1', body: 'Hello world!' },
  { id: '2', code: ':snippet2', body: 'Hello world!' },
  { id: '3', code: ':snippet3', body: 'Hello world!' },
  { id: '4', code: ':snippet4', body: 'Hello world!' },
  { id: '5', code: ':snippet5', body: 'Hello world!' },
  { id: '6', code: ':snippet6', body: 'Hello world!' },
];

export namespace SnippetsSpace {
  export interface IState {

  }

  export interface IProps {

  }
}

const mapStateToProps = (state: IGlobalState) => ({
  /// nameStore: state.nameStore
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  /*
    onLoadingMail: () => {
     dispatch(Mail.Actions.onLoadingMail.REQUEST());
   },
  */
});

@(connect(mapStateToProps, mapDispatchToProps))
export class Snippets extends Component<SnippetsSpace.IProps, SnippetsSpace.IState> {

  state = {};

  onSelectSnippet = (snippet: ISnippet) => () => {
    console.log('Select ', snippet);
  }

  toItem = (snippet: ISnippet): ICustomItem => {
    return { id: snippet.id, title: snippet.code, description: '---', rightText: '---' };
  }

  onChangePage = (event, page: number): void => {
    console.log('Change page');
  }

  render() {
    return (
      <Paper elevation={4} className={'template-list'}>
        <ListElement
          entities={testData}
          toItem={this.toItem}
          selectItem={this.onSelectSnippet}
          pagination={{current_page: 1, per_page: testData.length, last_page: 5, total: testData.length }}
          onChangePage={this.onChangePage}
        />
      </Paper>
    );
  }
}

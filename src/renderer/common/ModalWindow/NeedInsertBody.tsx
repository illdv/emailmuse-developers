import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import ModalWindow from 'src/renderer/common/ModalWindow/ModalWindow';
import { Typography } from '@material-ui/core';

export namespace NeedInsertBodySpace {
  export interface IState {

  }

  export interface IProps {

  }
}

export class NeedInsertBody extends Component<NeedInsertBodySpace.IProps, NeedInsertBodySpace.IState> {

  state: NeedInsertBodySpace.IState = {};

  render() {
    return (
      <ModalWindow title={'Show us where to put the email swipe content'}>
        <Typography variant='title'>
          Type the phrase CONTENTGOESHERE where
          you want the swipe content to go. The click Save
        </Typography>
      </ModalWindow>
    );
  }
}

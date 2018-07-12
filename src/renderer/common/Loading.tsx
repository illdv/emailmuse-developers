import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { CircularProgress, Fade } from '@material-ui/core';
import InCenter from 'src/renderer/common/InCenter';
import { ListElementSpace } from 'src/renderer/common/List/ListTable/ListTable';
import { CSSProperties } from 'react';

interface ILoadingProps {
  style?: CSSProperties;
}

export class Loading extends Component<ILoadingProps>  {

  state = {};

  render() {
    return (
      <div style={{ height: '100%' }} {...this.props}>
        <InCenter>
          <Fade in timeout={500}>
            <CircularProgress size={60}/>
          </Fade>
        </InCenter>
      </div>
    );
  }
}

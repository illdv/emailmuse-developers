import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { CircularProgress, Fade } from '@material-ui/core';
import InCenter from 'src/renderer/common/InCenter';

export class Loading extends Component {

  state = {};

  render() {
    return (
      <div style={{ height: '100%' }}>
        <InCenter>
          <Fade in timeout={500}>
            <CircularProgress size={60}/>
          </Fade>
        </InCenter>
      </div>
    );
  }
}

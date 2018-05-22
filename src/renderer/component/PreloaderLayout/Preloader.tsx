import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { CircularProgress, Fade } from '@material-ui/core';
import InCenter from 'src/renderer/common/InCenter';
import block from 'bem-ts';
const b = block('preloader');
import 'src/renderer/component/PreloaderLayout/Preloader.scss';

export class Preloader extends Component {

  state = {};

  render() {
    return (
      <div className={b()}>
        <InCenter>
          <Fade in timeout={500}>
            <CircularProgress size={60}/>
          </Fade>
        </InCenter>
      </div>
    );
  }
}

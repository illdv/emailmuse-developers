import * as React from 'react';
import { Component } from 'react';

import { LinearProgress } from '@material-ui/core';

export class ProgressBar extends Component<any> {
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          width: '100%',
          textAlign: 'right',
        }}
      >
        Update
        <LinearProgress />
      </div>
    );
  }
}

export default ProgressBar;

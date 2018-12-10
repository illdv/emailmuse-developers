import * as React from 'react';
import { PureComponent } from 'react';
const { ipcRenderer } = require('electron');

import {
  LinearProgress,
  withStyles,
  createStyles,
  Theme,
  WithStyles,
  Fade,
} from '@material-ui/core';

interface IProps extends WithStyles<typeof styles> {}
interface IState {
  isDownloaded: boolean;
}

class ProgressBar extends PureComponent<IProps, IState> {
  state = {
    isDownloaded: false,
  };

  render() {
    ipcRenderer.on('update message', (event, text) => {
      this.setState({
        isDownloaded: text === 'update is loading',
      });
    });

    const { classes } = this.props;
    return (
      <Fade in={this.state.isDownloaded} timeout={3000}>
        <div className={classes.wrapper}>
          <p className={classes.message}>
            {this.state.isDownloaded
              ? 'Your application updating now...'
              : 'Updating success!'}
          </p>
          <LinearProgress />
        </div>
      </Fade>
    );
  }
}

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    wrapper: {
      position: 'absolute',
      bottom: '0',
      width: '100%',
      textAlign: 'center',
    },
    message: {
      color: palette.text.secondary,
      paddingBottom: spacing.unit,
      paddingLeft: spacing.unit,
      margin: 0,
      fontStyle: 'italic',
    },
  });

export default withStyles(styles)(ProgressBar);

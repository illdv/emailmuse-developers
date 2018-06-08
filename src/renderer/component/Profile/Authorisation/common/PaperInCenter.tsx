import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import InCenter from 'src/renderer/common/InCenter';
import { Paper, WithStyles, withStyles } from '@material-ui/core';

const styles = () => ({
  paper: {
    width: 500,
    height: 300,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 48,
    paddingBottom: 26,
  },
});

export namespace PaperInCenterSpace {
  export interface IState {
  }

  export interface IProps {
    stylePaper?: React.CSSProperties;
  }
}

class PaperInCenter extends Component<PaperInCenterSpace.IProps & WithStyles<'paper'>, PaperInCenterSpace.IState> {

  state = {};

  render() {
    const {children, classes, stylePaper} = this.props;
    return (
      <InCenter>
        <Paper square className={classes.paper} style={stylePaper}>
          {children}
        </Paper>
      </InCenter>
    );
  }
}

export default withStyles(styles)(PaperInCenter);

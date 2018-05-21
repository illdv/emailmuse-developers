import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import InCenter from 'src/renderer/common/InCenter';
import { Paper, WithStyles, withStyles } from '@material-ui/core';

const styles = theme => ({
  paper: {
    width: 500,
    height: 300,
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 48,
    paddingBottom: 26,
  }
});

class PaperInCenter extends Component<WithStyles<'paper'>, any> {

  state = {};

  render() {
    const {children, classes} = this.props;
    return (
      <InCenter>
        <Paper square className={classes.paper}>
          {children}
        </Paper>
      </InCenter>
    );
  }
}

export default withStyles(styles)(PaperInCenter);


import { Component } from 'react';
import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Grid, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    height: '100%',
  }
});

export namespace InCenterSpace {
  export interface IState {

  }

  export interface IProps {
    classes?: any;
  }
}

class InCenter extends Component<InCenterSpace.IProps, InCenterSpace.IState> {

  state = {};

  render() {
    const { classes, children } = this.props;

    return (
      <Grid item xs={12} className={classes.root}>
        <Grid
          className={classes.root}
          container
          spacing={16}
          alignItems={'center'}
          justify={'center'}
        >
          {children}
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(InCenter as any);

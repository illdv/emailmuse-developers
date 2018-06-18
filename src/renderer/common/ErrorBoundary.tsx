import * as React from 'react';
import { Component } from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Grid, Typography } from '@material-ui/core';

import InCenter from 'src/renderer/common/InCenter';
import PaperInCenter from 'src/renderer/component/Profile/Authorisation/common/PaperInCenter';
import { logoutAction } from 'src/renderer/component/Profile/Authorisation/flux/module';

export namespace ErrorBoundarySpace {
  export interface IState {
    hasError: boolean;
  }

  export interface IProps {
    logout?: () => void;
  }
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  logout: () => {
    dispatch(logoutAction());
  },
});

@(connect(null, mapDispatchToProps))
export class ErrorBoundary extends Component<ErrorBoundarySpace.IProps, ErrorBoundarySpace.IState> {

  state: ErrorBoundarySpace.IState = {
    hasError: false,
  };

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
  }

  restartApplication = () => {
    this.props.logout();
    this.setState({hasError: false});
  }

  render() {
    if (this.state.hasError) {
      return (
        <PaperInCenter stylePaper={{width: 550, height: 350}}>
          <Grid item xs={12}>
            <Typography color={'error'} variant='display2' gutterBottom>
              Something went wrong.
            </Typography>
          </Grid>
          <InCenter>
            <Button onClick={this.restartApplication} variant='raised' color='primary'>
              Restart application
            </Button>
          </InCenter>
        </PaperInCenter>
      );
    }
    return this.props.children;
  }
}

import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Grid, Grow, Typography } from '@material-ui/core/';

export function Title(props: { title: string, subtitle?: string }) {
  const { title, subtitle } = props;
  return (
    <Grow in timeout={1000} style={{ paddingBottom: 0 }}>
      <Grid item xs={12}>
        <Typography style={{color: 'Black'}} variant="display1" gutterBottom>
          {title}
        </Typography>
        <Typography variant="subheading" gutterBottom>
          {subtitle || ''}
        </Typography>
      </Grid>
    </Grow>
  );
}

export function Navigation(props: { onBack?: () => void, onNext?: () => void, canNext?: boolean } = {canNext: true}) {
  const { onBack, onNext, canNext } = props;
  return (
    <Grow in timeout={2000}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Grid container justify={'flex-start'}>
              <Button variant={'raised'} color="primary" onClick={onBack}>
                Back
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify={'flex-end'}>
              <Button variant={'raised'} color="primary" onClick={onNext} disabled={canNext}>
                Next
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grow>
  );
}


interface IActionProps {
  onClickForgotPassword: () => void;
  onCreateAccount: () => void;
  onClickNext: () => void;
}

export function Action(props: IActionProps) {

  const { onClickForgotPassword, onCreateAccount, onClickNext } = props;

  const button = {
    margin: 20,
  };

  const url = {
    paddingLeft: 0,
    paddingRight: 0,
  };

  const url2 = {
    paddingRight: 0,
    textAlign: 'right' as any,
    marginLeft: 10
  };

  return (
    <Grow in timeout={2000}>
      <Grid item xs={12}>
        <Grid item xs={12}>
          <Grid container direction={'row'} justify={'flex-end'}>
            <Button
              variant="raised"
              color="primary"
              style={button}
              onClick={onClickNext}
            >
              Next
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ paddingBottom: 0 }}>
          <Grid
            container
            direction={'row'}
            justify={'space-between'}
            alignItems={'flex-end'}
          >
            <Grid item xs={6} style={{ paddingBottom: 0 }}>
              <Button
                color="primary"
                style={url}
                onClick={onClickForgotPassword}
              >
                Forgot password?
              </Button>
            </Grid>
            <Grid item xs={6} style={{ paddingBottom: 0 }}>
              <Button
                color="primary"
                style={url2}
                onClick={onCreateAccount}
              >
                Create account
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grow>
  );
}

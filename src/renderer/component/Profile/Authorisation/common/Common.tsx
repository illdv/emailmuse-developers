import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { Button, Grid, Grow, Typography } from '@material-ui/core/';
import { ButtonHotKey } from 'src/renderer/common/ButtonHotKey';

export function Title(props: { title: string, subtitle?: string }) {
  const { title, subtitle } = props;
  return (
    <Grow in timeout={1000} style={{ paddingBottom: 0, paddingTop: 20 }}>
      <Grid item xs={12}>
        <Typography style={{ color: 'Black' }} variant='display1' gutterBottom>
          {title}
        </Typography>
        <Typography variant='subheading' gutterBottom>
          {subtitle || ''}
        </Typography>
      </Grid>
    </Grow>
  );
}

export function Navigation(props: { onBack?: () => void, onNext?: () => void, canNext?: boolean } = { canNext: true }) {
  const { onBack, onNext, canNext } = props;
  return (
    <Grow in timeout={2000}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <Grid container justify={'flex-start'}>
              <Button variant={'raised'} color='primary' onClick={onBack}>
                Back
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container justify={'flex-end'}>
              <Button variant={'raised'} color='primary' onClick={onNext} disabled={!canNext}>
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
  loginGoogle: () => void;
  canNext: boolean;
}

export function Action(props: IActionProps) {

  const {
          onClickForgotPassword,
          onCreateAccount,
          onClickNext,
          canNext,
          loginGoogle,
        } = props;

  const url = {
    paddingLeft: 0,
    paddingRight: 0,
  };

  const url2 = {
    paddingRight: 0,
    marginLeft: 10,
  };

  return (
    <Grow in timeout={2000}>
      <Grid container justify={'space-between'}>
        <Grid container direction={'row'} justify={'space-between'} alignItems={'center'}>
          <Button variant='contained' color='primary' onClick={loginGoogle}>
            Sign In With Google
          </Button>
          <ButtonHotKey
            hotKey={'Enter'}
            variant='raised'
            color='primary'
            onClick={onClickNext}
            disabled={!canNext}
          >
            Next
          </ButtonHotKey>
        </Grid>
        <Grid
          container
          direction={'row'}
          justify={'space-between'}
          alignItems={'center'}
          style={{paddingTop: 30}}
        >
          <Button
            color='primary'
            style={url}
            onClick={onClickForgotPassword}
          >
            Forgot password?
          </Button>
          <Button
            color='primary'
            style={url2}
            onClick={onCreateAccount}
          >
            Create account
          </Button>
        </Grid>
      </Grid>
    </Grow>
  );
}

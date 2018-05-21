import * as React from 'react';
import {Paper, IconButton, InputAdornment, InputLabel, Grid, Typography} from '@material-ui/core';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { IStyle } from 'type/materialUI';
import classNames from 'classnames';
import ChangePassword from 'src/renderer/component/Account/ChangePassword';

const styles:IStyle = theme => ({
  root: {
    width: '95%',
    height: '95%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 3
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  }
});
export namespace AccountSettingsSpace {
  export interface IProps {
    classes?: any;
    name?: string;
    email?: string;
  }
  export interface IState {}
}

class AccountSettings extends React.Component<AccountSettingsSpace.IProps & WithStyles<any> , AccountSettingsSpace.IState> {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <Paper className={classes.root}>
          <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant='headline' noWrap align='center'>My account Settings</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='headline' noWrap align='center'>Your name: Foo</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='headline' noWrap align='center'>Your Email: Baz</Typography>
              </Grid>
          </Grid>
          <ChangePassword/>
        </Paper>
    </div>
    );
  }
}

export default withStyles(styles)(AccountSettings);
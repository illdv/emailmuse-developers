import * as React from 'react';
import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IStyle } from 'type/materialUI';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  withStyles,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { WithStyles } from '@material-ui/core/styles/withStyles';

import { AccountActions, IAccountActions } from 'src/renderer/component/Profile/Account/flux/module';
import { bindModuleAction } from 'src/renderer/utils';

const styles: IStyle = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  lastRow: {
    marginTop: theme.spacing.unit * 3,
  },
  buttons: {
    margin: theme.spacing.unit,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
  textField: {
    flexBasis: 200,
  },
});

export namespace ChangePasswordDialogSpace {
  export interface IProps {
    classes?: any;
    open?: boolean;
    onClose?: () => void;
    email?: string;
    name?: string;
    action?: IAccountActions;
  }

  export interface IState {
    showPassword?: boolean;
    showPasswordC?: boolean;
    showPasswordN?: boolean;
    fields?: {
      password?: string;
      old_password?: string;
      password_confirmation?: string;
    };
  }
}

const mapStateToProps = state => ({
  name: '',
  email: '',
});

const mapDispatchToProps = dispatch => ({
  changePassword: bindActionCreators(AccountActions.changePassword.REQUEST, dispatch),
  action: bindModuleAction(AccountActions, dispatch),
});

@connect(mapStateToProps, mapDispatchToProps)
class ChangePasswordDialog
  extends React.Component<ChangePasswordDialogSpace.IProps & WithStyles<any>, ChangePasswordDialogSpace.IState> {
  state = {
    showPassword: false,
    showPasswordC: false,
    showPasswordN: false,
    fields: {
      old_password: '',
      password: '',
      password_confirmation: '',
    },
  };

  handleChange            = (type: string) => event =>
    this.setState({
      fields: { ...this.state.fields, [type]: event.target.value },
    })
  handleMouseDownPassword = event => {
    event.preventDefault();
  }
  handleClickShowPassword = (type: string) => () =>
    this.setState({ [type]: !this.state[type] })
  submit                  = () => {
    this.props.action.changePassword.REQUEST({ data: this.state.fields });
    this.setState({
      fields: Object.keys(this.state.fields).reduce((p, k) => ({ ...p, [k]: '' }), {}),
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>Change your password</DialogTitle>
        <DialogContent>
          <Grid container spacing={24} className={classes.root}>
            <Grid item xs={12}>
              <Grid container spacing={24} alignItems={'center'} justify={'center'}>
                <Grid item>
                  <FormControl className={classNames(classes.margin, classes.textField)}>
                    <InputLabel htmlFor='old_password'>Old Password</InputLabel>
                    <Input
                      id='old_password'
                      type={this.state.showPassword ? 'text' : 'password'}
                      value={this.state.fields.old_password}
                      onChange={this.handleChange('old_password')}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='Toggle password visibility'
                            onClick={this.handleClickShowPassword('showPassword')}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? <VisibilityOff/> : <Visibility/>}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={24} alignItems={'center'} justify={'center'}>
                <Grid item>
                  <FormControl className={classNames(classes.margin, classes.textField)}>
                    <InputLabel htmlFor='password'>New password</InputLabel>
                    <Input
                      id='password'
                      type={this.state.showPasswordN ? 'text' : 'password'}
                      value={this.state.fields.password}
                      onChange={this.handleChange('password')}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='Toggle password visibility'
                            onClick={this.handleClickShowPassword('showPasswordN')}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPasswordN ? <VisibilityOff/> : <Visibility/>}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container spacing={24} alignItems={'center'} justify={'center'}>
                <Grid item>
                  <FormControl className={classNames(classes.margin, classes.textField)}>
                    <InputLabel htmlFor='password_confirmation'>Confirm new password</InputLabel>
                    <Input
                      id='password_confirmation'
                      type={this.state.showPasswordC ? 'text' : 'password'}
                      value={this.state.fields.password_confirmation}
                      onChange={this.handleChange('password_confirmation')}
                      endAdornment={
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='Toggle password visibility'
                            onClick={this.handleClickShowPassword('showPasswordC')}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPasswordC ? <VisibilityOff/> : <Visibility/>}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.onClose} color='primary'>
            Close
          </Button>
          <Button onClick={this.submit} color='primary'>
            Change password
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ChangePasswordDialog);

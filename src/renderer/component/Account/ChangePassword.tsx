import * as React from 'react';
import {Paper,Input, FormControl, IconButton, InputAdornment, InputLabel, Grid, Button} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import withStyles from '@material-ui/core/styles/withStyles';
import { IStyle } from 'type/materialUI';
import classNames from 'classnames';

export namespace ChangePasswordSpace {
  export interface IProps {
    classes?: any;
  }
  export interface IState {
    showPassword: boolean;
    showPasswordC: boolean;
    showPasswordN: boolean;
    password: string;
    newPassword: string;
    confirmPassword: string;
  }
}
const styles: IStyle = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  lastRow: {
    marginTop: theme.spacing.unit * 3
  },
  buttons: {
    margin: theme.spacing.unit
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

class ChangePassword extends React.Component<any,any> {
  state = {
    showPassword: false,
    showPasswordC: false,
    showPasswordN: false,
    fields: {
      password: '',
      newPassword: '',
      confirmPassword: '',
    }
  };

  handleChange = (type:string) => event => 
    this.setState({
      [type]: event.target.value
    })
  handleMouseDownPassword = event => {
    event.preventDefault();
  }
  handleClickShowPassword = (type: string) => () => {
    console.log(type,this.state[type]);
    return this.setState({ [type]: !this.state[type] });
  }
  submit = () => {
    console.log(this.state.fields);
  }
  render(){
    const { classes } = this.props;
    console.log(this.state);
    return (<>
      <Grid container spacing={24} className={classes.root}>
        <Grid item xs={12} >
          <Grid container spacing={24} alignItems={'center'} justify={'center'}>
            <Grid item>
              <FormControl className={classNames(classes.margin, classes.textField)}>
                <InputLabel htmlFor="password">Old Password</InputLabel>
                      <Input
                        id="password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.fields.password}
                        onChange={this.handleChange('password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword('showPassword')}
                              onMouseDown={this.handleMouseDownPassword}
                            >
                              {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
              </FormControl>
            </Grid>
            <Grid container spacing={24} alignItems={'center'} justify={'center'}>
              <Grid item>
                <FormControl className={classNames(classes.margin, classes.textField)}>
                  <InputLabel htmlFor="newPassword">New password</InputLabel>
                      <Input
                        id="newPassword"
                        type={this.state.showPasswordN ? 'text' : 'password'}
                        value={this.state.fields.newPassword}
                        onChange={this.handleChange('newPassword')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword('showPasswordN')}
                              onMouseDown={this.handleMouseDownPassword}
                            >
                              {this.state.showPasswordN ? <VisibilityOff /> : <Visibility />}
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
                  <InputLabel htmlFor="confirmPassword">Confirm new password</InputLabel>
                      <Input
                        id="confirmPassword"
                        type={this.state.showPasswordC ? 'text' : 'password'}
                        value={this.state.fields.confirmPassword}
                        onChange={this.handleChange('confirmPassword')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              onClick={this.handleClickShowPassword('showPasswordC')}
                              onMouseDown={this.handleMouseDownPassword}
                            >
                              {this.state.showPasswordC ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                </FormControl>
              </Grid>
            </Grid>
            <Grid container spacing={24} alignItems={'center'} justify={'center'} className={classes.lastRow}>
              <Grid item>
                <Button variant="raised" color="primary" className={classes.button}>
                    Send
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
    );
  }
}
export default  withStyles(styles)(ChangePassword);
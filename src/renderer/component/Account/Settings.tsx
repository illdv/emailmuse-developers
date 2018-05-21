import * as React from 'react';
import {Paper, IconButton, InputAdornment, InputLabel, Grid, Typography} from '@material-ui/core';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { IStyle } from 'type/materialUI';
import classNames from 'classnames';
import ChangePassword from 'src/renderer/component/Account/ChangePassword';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AccountSpace } from './flux/actions';
import { Loading } from 'src/renderer/common/Loading';

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
    getProfile?: any;
  }
  export interface IState {}
}
const mapStateToProps = state => ({
  email: state.accounts.user.email,
  name: state.accounts.user.name
});

const mapDispathToProps = dispatch => ({
  getProfile: bindActionCreators(AccountSpace.Actions.getProfile.REQUEST, dispatch)
});
@connect(mapStateToProps,mapDispathToProps)
class AccountSettings extends React.Component<AccountSettingsSpace.IProps & WithStyles<any> , AccountSettingsSpace.IState> {
  componentDidMount(){
    !this.props.name && this.props.getProfile();
  }
  render() {
    const { classes, name, email } = this.props;
    return name ? (
      <div className={classes.container}>
        <Paper className={classes.root}>
          <Grid container spacing={24}>
              <Grid item xs={12}>
                <Typography variant='headline' noWrap align='center'>Account settings</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='subheading' noWrap align='left'>
                  Name:  {name}
                </Typography>
                <Typography variant='subheading' noWrap align='left'>
                  Email: {email}
                </Typography>
              </Grid>
          </Grid>
          <ChangePassword/>
        </Paper>
    </div>
    ) : <Loading/>;
  }
}


export default withStyles(styles)(AccountSettings);
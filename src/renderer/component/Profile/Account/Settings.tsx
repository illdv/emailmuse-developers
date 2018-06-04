import * as React from 'react';
import { ChangeEvent } from 'react';
import { Grid, Paper, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { IStyle } from 'type/materialUI';
import { connect } from 'react-redux';
import { Email } from '@material-ui/icons';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { bindActionCreators } from 'redux';

import { Loading } from 'src/renderer/common/Loading';
import { AccountsDialog } from 'src/renderer/component/Profile/Account/AccountsDialog';
import { IProfileState } from 'src/renderer/component/Profile/flux/models';
import InCenter from 'src/renderer/common/InCenter';
import ChangePasswordDialog from './ChangePasswordDialog';
import { AccountActions } from 'src/renderer/component/Profile/Account/flux/module';

const styles: IStyle = theme => ({
  root: {
    width: '95%',
    height: '95%',
    display: 'flex',
    flexWrap: 'wrap',
    padding: theme.spacing.unit * 3,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  withoutLabel: {
    marginTop: theme.spacing.unit * 3,
  },
});
export namespace AccountSettingsSpace {
  export interface IProps {
    classes?: any;
    getProfile?: any;
    profile?: IProfileState;
    changeName?: (name: string) => void;
  }

  export interface IState {
    isDialogManageAccountsOpen: boolean;
    isDialogChangePasswordOpen: boolean;
    name: string;
    email: string;
  }
}
const mapStateToProps = state => ({
  profile: state.profile,
});

const mapDispathToProps = dispatch => ({
  getProfile: bindActionCreators(AccountActions.getProfile.REQUEST, dispatch),
  changeName: bindActionCreators(AccountActions.changeName.REQUEST, dispatch),
});

@connect(mapStateToProps, mapDispathToProps)
class AccountSettings extends React.Component<AccountSettingsSpace.IProps & WithStyles<any>,
  AccountSettingsSpace.IState> {

  state = {
    name: '',
    email: '',
    isDialogManageAccountsOpen: false,
    isDialogChangePasswordOpen: false,
  };

  static getDerivedStateFromProps(
    nextProps: AccountSettingsSpace.IProps,
    prevState: AccountSettingsSpace.IState): AccountSettingsSpace.IState {

    const { profile } = nextProps;
    const {email, name}        = profile.auth.user;
    if (email !== prevState.email) {
      return {
        name,
        email,
        isDialogChangePasswordOpen: false,
        isDialogManageAccountsOpen: false,
      };

    }
    return null;
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.profile.auth.user) {
      this.props.getProfile();
    }
  }

  onOpenManageAccounts = () => {
    this.setState({ isDialogManageAccountsOpen: true });
  }

  onCloseManageAccounts = () => {
    this.setState({ isDialogManageAccountsOpen: false });
  }

  onOpenDialogChangePassword = () => {
    this.setState({ isDialogChangePasswordOpen: true });
  }

  onCloseDialogChangePassword = () => {
    this.setState({ isDialogChangePasswordOpen: false });
  }

  onItemClick = (selected: string) => {
    console.log(selected);
  }

  onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: e.target.value });
  }

  onSave = () => {
    this.props.changeName(this.state.name);
  }

  render() {
    const { classes, profile } = this.props;
    const { name, email }      = profile.auth.user;

    if (!name) {
      return <Loading/>;
    }

    return (
      <div className={classes.container}>
        <Paper className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <Typography variant='headline' noWrap align='center'>Profile settings</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id='name'
                label='Your name'
                value={this.state.name}
                className={classes.textField}
                margin='normal'
                onChange={this.onChangeName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                disabled
                id='mail'
                label='Your mail'
                value={email}
                margin='normal'
                helperText='Mail cannot be changed'
              />
            </Grid>
            <Grid item xs={12}>
              <Button onClick={this.onOpenDialogChangePassword} variant='raised' color='primary'>
                Change password
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button onClick={this.onOpenManageAccounts} variant='raised' color='primary'>
                <Email/>
                Manage Gmail accounts
              </Button>
            </Grid>
            <Grid item xs={12}>
              <InCenter>
                <Button onClick={this.onSave} variant='raised' color='primary'>
                  Save setting
                </Button>
              </InCenter>
            </Grid>
          </Grid>
          <AccountsDialog
            open={this.state.isDialogManageAccountsOpen}
            onClose={this.onCloseManageAccounts}
            onItemClick={this.onItemClick}
          />
          <ChangePasswordDialog
            open={this.state.isDialogChangePasswordOpen}
            onClose={this.onCloseDialogChangePassword}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(AccountSettings);

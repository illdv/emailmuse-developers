import * as React from 'react';
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { IStyle } from 'type/materialUI';
import ChangePassword from 'src/renderer/component/Account/ChangePassword';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AccountSpace } from './flux/actions';
import { Loading } from 'src/renderer/common/Loading';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';
import { AccountsDialog } from 'src/renderer/component/Account/AccountsDialog';

const styles: IStyle = (theme) => ({
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
    accounts?: FluxAccounts.IState;
  }

  export interface IState {
    openDialog: boolean;
  }
}
const mapStateToProps = (state) => ({
  accounts: state.accounts,
});

const mapDispathToProps = (dispatch) => ({
  getProfile: bindActionCreators(AccountSpace.Actions.getProfile.REQUEST, dispatch),
});

@connect(mapStateToProps, mapDispathToProps)
class AccountSettings extends React.Component<AccountSettingsSpace.IProps & WithStyles<any>,
  AccountSettingsSpace.IState> {
  constructor(props) {
    super(props);
    this.state = { openDialog: false};
  }

  componentDidMount() {
    if (this.props.accounts.user) {
      this.props.getProfile();
    }
  }

  handleOpenDialog = () => {
    this.setState({ openDialog: true});
  }

  handleCloseDialog = () => {
    this.setState({ openDialog: false});
  }

  handleItemClick = (selected: string) => {
    // tslint:disable-next-line
    console.log(selected);
  }

  render() {
    const { classes, accounts } = this.props;
    const { name, email }       = accounts.user;

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
              <Typography variant='subheading' noWrap align='left'>
                Name: {name}
                <Divider light/>
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant='subheading' noWrap align='left'>
                Email: {email}
                <Divider light/>
              </Typography>
            </Grid>
          </Grid>
          <ChangePassword/>
          <Button onClick={this.handleOpenDialog}>
            Manage email accounts
          </Button>
          <AccountsDialog
            open={this.state.openDialog}
            onClose={this.handleCloseDialog}
            onItemClick={this.handleItemClick}
          />
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(AccountSettings);

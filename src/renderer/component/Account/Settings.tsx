import * as React from 'react';
import { Divider, Grid, Paper, Typography } from '@material-ui/core';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { IStyle } from 'type/materialUI';
import ChangePassword from 'src/renderer/component/Account/ChangePassword';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AccountSpace } from './flux/actions';
import { Loading } from 'src/renderer/common/Loading';
import { FluxAccounts } from 'src/renderer/component/Authorization/flux/FluxAccounts';

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
  componentDidMount() {
    if (this.props.accounts.user) {
      this.props.getProfile();
    }
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
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles)(AccountSettings);

import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { SupervisorAccount } from '@material-ui/icons';
import { IStyle } from 'type/materialUI';
import {
  Button,
  Grid,
  MenuList,
  Paper,
  Slide,
  Tooltip,
  WithStyles,
  withStyles,
} from '@material-ui/core/';
import {
  IDrawerMenuActions,
  MenuItemType,
} from 'src/renderer/component/Menu/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { classNamesEmails } from 'src/renderer/component/Tutorial/steps/emails';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import MenuItems from './MenuItems';

export interface IProps extends WithStyles<typeof styles> {
  actions: IDrawerMenuActions;
  isLockedSwipe: boolean;
}

export interface IState {
  selectedItem: string;
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators(DrawerMenuAction, dispatch),
});

const mapStateToProps = (state: IGlobalState) => ({
  isLockedSwipe: state.profile.auth.user.is_swipe_locked,
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Menu extends React.Component<IProps, IState> {
  state = {
    selectedItem: MenuItemType.EMAILS,
  };
  selectIAcc = (selectedItem: MenuItemType) => () => {
    this.props.actions.selectMenuItem({ selectedItem });
  }

  render() {
    const { classes } = this.props;

    return (
      <Slide direction='right' in mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.root}>
          <MenuList>
            <MenuItems
              isLockedSwipe={this.props.isLockedSwipe}
              actions={this.props.actions}
            />
          </MenuList>
          <Grid
            style={{ height: '100%', marginBottom: 10, marginLeft: 10 }}
            container
            direction={'column'}
            justify={'flex-end'}
          >
            <Tooltip title={'Account'}>
              <Button
                variant='fab'
                color='primary'
                aria-label='add'
                className={classNamesEmails.ACCOUNT}
                onClick={this.selectIAcc(MenuItemType.ACCOUNT)}
              >
                <SupervisorAccount />
              </Button>
            </Tooltip>
          </Grid>
        </Paper>
      </Slide>
    );
  }
}

const styles: IStyle = theme => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
  },
});

export default withStyles(styles)(Menu);

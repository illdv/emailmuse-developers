import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import {
  MenuList,
  Paper,
  Slide,
  WithStyles,
  withStyles,
  createStyles,
  LinearProgress,
  Theme,
} from '@material-ui/core/';
import {
  IDrawerMenuActions,
  MenuItemType,
} from 'src/renderer/component/Menu/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import MenuItems from './MenuItems';
// import { ProgressBar } from 'src/renderer/common/ProgressBar';
const { ipcRenderer } = (window as any).require('electron');
export interface IProps extends WithStyles<typeof styles> {
  actions: IDrawerMenuActions;
  isLockedSwipe: boolean;
  location: any;
}

export interface IState {
  isUpdate: boolean;
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
    isUpdate: null,
  };
  selectIAcc = (selectedItem: MenuItemType) => () => {
    this.props.actions.selectMenuItem({ selectedItem });
  };

  static getDerivedStateFromProps(props, state) {
    return null;
  }
  foo = () => {
    ipcRenderer.send('update-notify-value', () => console.log(111));
  };

  render() {
    const { classes } = this.props;
    return (
      <Slide direction='right' in mountOnEnter unmountOnExit>
        <Paper elevation={4} classes={{ root: classes.paper }}>
          {/* <button onClick={this.foo}>asdasd</button> */}
          <MenuList classes={{ root: classes.list }}>
            <MenuItems
              isLockedSwipe={this.props.isLockedSwipe}
              actions={this.props.actions}
              pathname={this.props.location.pathname}
            />
            {/* <ProgressBar /> */}
          </MenuList>
        </Paper>
      </Slide>
    );
  }
}

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    paper: {
      height: '100%',
    },

    list: {
      display: 'flex',
      height: '100%',
      padding: 0,
      flexDirection: 'column',
      overflowY: 'auto',
      position: 'relative',
    },
  });

export default withStyles(styles)(Menu);

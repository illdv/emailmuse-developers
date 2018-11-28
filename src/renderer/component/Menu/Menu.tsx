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
} from '@material-ui/core/';
import {
  IDrawerMenuActions,
  MenuItemType,
} from 'src/renderer/component/Menu/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import MenuItems from './MenuItems';

export interface IProps extends WithStyles<typeof styles> {
  actions: IDrawerMenuActions;
  isLockedSwipe: boolean;
  location: any,
}

export interface IState {
  selectedAcc: boolean;
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
  selectIAcc = (selectedItem: MenuItemType) => () => {
    this.props.actions.selectMenuItem({ selectedItem });
  }

  render() {
  
    
    const { classes } = this.props;
    return (
      <Slide direction='right' in mountOnEnter unmountOnExit>
        <Paper elevation={4} classes={{ root: classes.paper }}>
          <MenuList classes={{ root: classes.list }}>
            <MenuItems
              isLockedSwipe={this.props.isLockedSwipe}
              actions={this.props.actions}
              pathname={this.props.location.pathname}
            />
          </MenuList>
        </Paper>
      </Slide>
    );
  }
}

const styles = ({ spacing, palette }) =>
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
    },
  });

export default withStyles(styles)(Menu)

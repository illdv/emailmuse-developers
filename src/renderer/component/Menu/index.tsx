import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Paper,
  Slide,
  WithStyles,
  withStyles,
  createStyles,
  Theme,
} from '@material-ui/core/';
import {
  IDrawerMenuActions,
  MenuItemType,
} from 'src/renderer/component/Menu/flux/interface';
import { DrawerMenuAction } from 'src/renderer/component/Menu/flux/action';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import MenuList from './MenuList';

export interface IProps extends WithStyles<typeof styles> {
  actions: IDrawerMenuActions;
  isLockedSwipe: boolean;
  menuItem: MenuItemType;
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators(DrawerMenuAction, dispatch),
});

const mapStateToProps = (state: IGlobalState) => ({
  isLockedSwipe: state.profile.auth.user.is_swipe_locked,
  menuItem: state.tutorial.name,
});
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class Menu extends React.Component<IProps> {
  render() {
    const { classes } = this.props;
    return (
      <Slide direction='right' in mountOnEnter unmountOnExit>
        <Paper elevation={4} classes={{ root: classes.paper }}>
          <MenuList
            isLockedSwipe={this.props.isLockedSwipe}
            menuItem={this.props.menuItem}
            actions={this.props.actions}
          />
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
  });

export default withStyles(styles)(Menu);

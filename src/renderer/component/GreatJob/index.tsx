import * as React from 'react';
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
  Fade,
  Paper,
  Typography,
} from '@material-ui/core';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { MenuItemType, IDrawerMenuActions } from '../Menu/flux/interface';
import { DrawerMenuAction } from '../Menu/flux/action';
import { bindActionCreators } from 'redux';
import TextBlock from './TextBlock';

type Props = {
  menuItem: MenuItemType;
  actions: IDrawerMenuActions;
} & WithStyles<typeof styles>;

type State = {
  videoLoading: boolean;
};
const mapStateToProps = (state: IGlobalState) => ({
  menuItem: state.tutorial.name,
});
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  actions: bindActionCreators(DrawerMenuAction, dispatch),
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
class GreatJob extends React.Component<Props, State> {
  selectItem = (selectedItem: MenuItemType) => () => {
    this.props.actions.selectMenuItem({ selectedItem });
  };

  render() {
    const { classes } = this.props;

    return (
      <Fade in timeout={1000}>
        <Paper classes={{ root: classes.wrapper }}>
          <Typography variant='headline' component='h2' paragraph>
            Great job!
          </Typography>
          <TextBlock selectItem={this.selectItem} />
        </Paper>
      </Fade>
    );
  }
}

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      paddingTop: 50,
    },
  });

const styledGreatJob = withStyles(styles)(GreatJob);

export default styledGreatJob;

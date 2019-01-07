import * as React from 'react';
import {
  Button,
  Theme,
  withStyles,
  WithStyles,
  createStyles,
  Fade,
  Paper,
  Typography,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { MenuItemType } from '../Menu/flux/interface';

type Props = {
  menuItem: MenuItemType;
} & WithStyles<typeof styles>;

const mapStateToProps = (state: IGlobalState) => ({
  menuItem: state.tutorial.name,
});
@connect(mapStateToProps)
class GreatJob extends React.Component<Props> {
  textBlock = (menuItem: MenuItemType) => {
    if (menuItem === MenuItemType.snippets) {
      return (
        <Typography variant='body1'>
          Okay... next let's creacte a simple email. <br /> Click the Layout
          button in the left nav.
        </Typography>
      );
    }
    return null;
  };

  render() {
    const { classes, menuItem } = this.props;
    console.log(menuItem);
    return (
      <Fade in timeout={1000}>
        <Paper classes={{ root: classes.wrapper }}>
          <Typography variant='headline' component='h2' paragraph>
            Great job!
          </Typography>
          {this.textBlock(menuItem)}
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

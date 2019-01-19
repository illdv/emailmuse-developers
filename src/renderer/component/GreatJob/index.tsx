import * as React from 'react';
import {
  Theme,
  withStyles,
  WithStyles,
  createStyles,
  Fade,
  Paper,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { connect, Dispatch } from 'react-redux';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import { MenuItemType, IDrawerMenuActions } from '../Menu/flux/interface';
import { isFirstTime, onboardingSteps } from 'src/renderer/common/isFirstTime';
import { DrawerMenuAction } from '../Menu/flux/action';
import { bindActionCreators } from 'redux';
import InCenter from 'src/renderer/common/InCenter';
import ActionBtn from './ActionBtn';

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
  state = {
    videoLoading: true,
  };

  onLoadVideo = () => {
    this.setState({
      videoLoading: false,
    });
  };

  selectItem = (selectedItem: MenuItemType) => () => {
    this.props.actions.selectMenuItem({ selectedItem });
  };

  textBlock = {
    1: (
      <Typography variant='body1'>
        Okay... next let's create a simple email. <br /> Click the Emails button
        in the left nav.
      </Typography>
    ),

    2: (
      <div>
        <Typography variant='body1' paragraph>
          You`ve created your first email.
        </Typography>
        <Typography variant='body1' paragraph>
          Now let`s see how easy it is to create a colorful attention grabbing
          "call to action" button.
        </Typography>
        <Typography variant='body1' paragraph>
          Ready?
        </Typography>
        <ActionBtn selectItem={this.selectItem} />
      </div>
    ),

    3: (
      <div>
        <Typography variant='body1' paragraph>
          Now you know how to create attention grabbing buttons for your emails!
        </Typography>
        <Typography variant='body1' paragraph>
          Next... let`s see how easy it is to add images to your emails
        </Typography>
        <Typography variant='body1' paragraph>
          Ready?
        </Typography>
        <ActionBtn selectItem={this.selectItem} />
      </div>
    ),

    done: (
      <div>
        <Typography variant='body1' paragraph>
          You`ve added an image to the library and addedit to your email.
        </Typography>
        <Typography variant='body1' paragraph>
          Watch this short video below for quick tips on how to get the most out
          of EmailMuse
        </Typography>
        <div style={{ width: 560, height: 315, paddingTop: 20 }}>
          <iframe
            style={{ width: '100%', height: '100%' }}
            hidden={this.state.videoLoading}
            src='https://www.youtube.com/embed/eSdoidIMGNk'
            onLoad={this.onLoadVideo}
          />
          {this.state.videoLoading && (
            <InCenter>
              <CircularProgress
                style={{
                  padding: 'auto',
                  marginTop: -100,
                  marginLeft: -40,
                }}
                size={60}
              />
            </InCenter>
          )}
        </div>
        <ActionBtn selectItem={this.selectItem} />
      </div>
    ),
  };

  render() {
    const { classes } = this.props;

    return (
      <Fade in timeout={1000}>
        <Paper classes={{ root: classes.wrapper }}>
          <Typography variant='headline' component='h2' paragraph>
            Great job!
          </Typography>
          {this.textBlock[onboardingSteps()]}
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

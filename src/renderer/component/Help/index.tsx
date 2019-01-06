import * as React from 'react';
import {
  Button,
  Theme,
  withStyles,
  WithStyles,
  createStyles,
  CircularProgress,
} from '@material-ui/core';
import InCenter from 'src/renderer/common/InCenter';
import { classNamesHelp } from '../Tutorial/steps/help';
import { runTutorial } from 'src/renderer/component/Tutorial/flux/reducer';
import { connect } from 'react-redux';

type Props = {
  runTutorial: ({}) => void;
} & WithStyles<typeof styles>;

type State = {
  videoLoading: boolean;
};
export const resetTour = () => {
  localStorage.setItem('EMAILS', '0');
  localStorage.setItem('SNIPPETS', '0');
  localStorage.setItem('LAYOUTS', '0');
  localStorage.setItem('IMAGE LIBRARY', '0');
  localStorage.setItem('SWIPES', '0');
  localStorage.setItem('TRAINING', '0');
  localStorage.setItem('ACCOUNT', '0');
  localStorage.setItem('HELP', '0');
};

class Help extends React.Component<Props, State> {
  state = {
    videoLoading: true,
  };

  componentDidMount() {
    this.props.runTutorial({});
  }

  onLoadVideo = () => {
    this.setState({
      videoLoading: false,
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={`${classNamesHelp.HELP_BODY} ${classes.wrapper}`}>
        <Button variant='contained' color='primary' onClick={resetTour}>
          restart tutorial
        </Button>
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
      </div>
    );
  }
}

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  });

const styledHelp = withStyles(styles)(Help);

export default connect(
  null,
  { runTutorial },
)(styledHelp);

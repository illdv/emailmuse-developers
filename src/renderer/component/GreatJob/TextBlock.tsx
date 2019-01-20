import * as React from 'react';
import { MenuItemType } from '../Menu/flux/interface';
import { Button, Typography, CircularProgress } from '@material-ui/core';
import { onboardingSteps } from 'src/renderer/common/isFirstTime';
import ActionBtn from './ActionBtn';
import InCenter from 'src/renderer/common/InCenter';

export default ({ selectItem }: any) => {
  const texts = {
    1: <SnippetText />,
    2: <SnippetEmailText selectItem={selectItem} />,
    3: <BtnEmailText selectItem={selectItem} />,
    done: <ImageEmailText selectItem={selectItem} />,
  };
  return <div>{texts[onboardingSteps()]}</div>;
};

const SnippetText = () => (
  <Typography variant='body1'>
    Okay... next let's create a simple email. <br /> Click the Emails button in
    the left nav.
  </Typography>
);

const SnippetEmailText = ({ selectItem }) => (
  <div>
    <Typography variant='body1' paragraph>
      You`ve created your first email.
    </Typography>
    <Typography variant='body1' paragraph>
      Now let`s see how easy it is to create a colorful attention grabbing "call
      to action" button.
    </Typography>
    <Typography variant='body1' paragraph>
      Ready?
    </Typography>
    <ActionBtn selectItem={selectItem} />
  </div>
);

const BtnEmailText = ({ selectItem }) => (
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
    <ActionBtn selectItem={selectItem} />
  </div>
);

class ImageEmailText extends React.Component<any> {
  state = {
    videoLoading: true,
  };

  onLoadVideo = () => {
    this.setState({
      videoLoading: false,
    });
  };

  render() {
    const { selectItem } = this.props;
    return (
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
            // hidden={this.state.videoLoading}
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
        <ActionBtn selectItem={selectItem} />
      </div>
    );
  }
}

import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Joyride from 'react-joyride';
import { ACTIONS, EVENTS } from 'react-joyride/es/constants';

import { IGlobalState } from 'src/renderer/flux/rootReducers';

import { Steps } from 'src/renderer/component/Tutorial/steps';
import { StepItemType } from 'src/renderer/component/Tutorial/flux/interface';
import { MenuItemType } from '../Menu/flux/interface';
import { isFirstTime } from 'src/renderer/common/isFirstTime';

type Props = {
  firstTime: boolean;
} & injectMapStateToProps;
type State = {
  isDisableBeacon: boolean;
  currentRoute: MenuItemType;
};
const mapStateToProps = (state: IGlobalState) => ({
  tutorial: state.tutorial,
  profile: state.profile,
});

class Tour extends React.Component<Props, State> {
  tour: any = React.createRef();
  state = {
    isDisableBeacon: true,
    currentRoute: null,
  };
  stopedTour = () => {
    this.tour.current.helpers.skip();
    this.setState({
      isDisableBeacon: false,
    });
  };

  handleJoyrideCallback = data => {
    const name = this.props.tutorial.name;
    const { action, index, type } = data;
    if (type === EVENTS.STEP_AFTER && action === ACTIONS.CLOSE) {
      this.stopedTour();
    } else {
      if (type === EVENTS.TOUR_END && localStorage.getItem(name)) {
        localStorage.removeItem(name);
      } else if (
        type === EVENTS.STEP_AFTER ||
        type === EVENTS.TARGET_NOT_FOUND
      ) {
        localStorage.setItem(name, index + (action === ACTIONS.PREV ? -1 : 1));
      }
    }
    this.forceUpdate();
  };

  componentDidMount() {
    document.addEventListener('keydown', () => this.stopedTour);
  }
  // componentDidUpdate() {
  //   if (this.props.firstTime) {
  //     resetTour();
  //   }
  // }
  componentWillUnmount() {
    document.removeEventListener('keydown', () => this.stopedTour);
  }
  handleSteps = ({ name, isDisableBeacon, user }) => {
    if (user && user.is_swipe_locked && name === MenuItemType.swipes) {
      return Steps[StepItemType[name + '_locked']](isDisableBeacon);
    }
    return Steps[StepItemType[name]](isDisableBeacon);
  };
  currentedName = name => {
    if (name) {
      return name;
    }
    return isFirstTime() ? MenuItemType.snippets : MenuItemType.emails;
  };
  render() {
    const { tutorial } = this.props;
    const getStepNumber = Number(localStorage.getItem(tutorial.name));
    const user = this.props.profile.auth.user;

    return (
      <>
        <Joyride
          ref={this.tour}
          continuous
          showProgress
          showSkipButton
          stepIndex={getStepNumber}
          steps={this.handleSteps({
            user,
            name: this.currentedName(tutorial.name),
            isDisableBeacon: this.state.isDisableBeacon,
          })}
          run={tutorial.run}
          callback={this.handleJoyrideCallback}
        />
      </>
    );
  }
}

type injectMapStateToProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps)(Tour);

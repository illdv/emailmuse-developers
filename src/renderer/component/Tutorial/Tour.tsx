import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Joyride from 'react-joyride';
import { ACTIONS, EVENTS } from 'react-joyride/es/constants';

import { IGlobalState } from 'src/renderer/flux/rootReducers';

import { Steps } from 'src/renderer/component/Tutorial/steps';
import { StepItemType } from 'src/renderer/component/Tutorial/flux/interface';
import { MenuItemType } from 'src/renderer/component/Menu/flux/interface';

type Props = injectMapStateToProps;
const mapStateToProps = (state: IGlobalState) => ({
  tutorial: state.tutorial,
});
export const onRestartBeacon = toggle => {
  return toggle;
};

class Tour extends React.Component<Props, any> {
  tour: any = React.createRef();
  state = {
    isDisableBeacon: true,
  };
  stopedTour = () => {
    this.tour.current.helpers.stop();
    this.setState({
      isDisableBeacon: false,
    });
  }

  handleJoyrideCallback = data => {
    const name = this.props.tutorial.name;
    const { action, index, type } = data;
    this.forceUpdate();

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
  }

  componentDidMount() {
    document.addEventListener('keydown', () => this.stopedTour);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', () => this.stopedTour);
  }
  handleSteps = ({ name, isDisableBeacon }) =>
    name === MenuItemType[name]
      ? Steps[StepItemType[name]](isDisableBeacon)
      : Steps[StepItemType[name]]

  render() {
    const { tutorial } = this.props;
    const getStepNumber = Number(localStorage.getItem(tutorial.name));
    // console.log(this.state.isDisableBeacon);

    return (
      <>
        <Joyride
          ref={this.tour}
          continuous
          showProgress
          showSkipButton
          stepIndex={getStepNumber}
          steps={this.handleSteps({
            name: tutorial.name,
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

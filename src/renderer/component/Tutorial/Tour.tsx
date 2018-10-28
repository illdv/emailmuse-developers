import * as React from 'react';
import { connect, Dispatch } from 'react-redux';
import Joyride from 'react-joyride';
import { ACTIONS, EVENTS } from 'react-joyride/es/constants';

import { IGlobalState } from 'src/renderer/flux/rootReducers';

import { Steps } from 'src/renderer/component/Tutorial/steps';
import { StepItemType } from 'src/renderer/component/Tutorial/flux/interface';

type Props = injectMapStateToProps;
const mapStateToProps = (state: IGlobalState) => ({
  tutorial: state.tutorial,
});

class Tour extends React.Component<Props, any> {
  tour: any = React.createRef();

  stopedTour = name => {
    localStorage.removeItem(name);
    this.tour.current.helpers.stop();
  }

  handleJoyrideCallback = data => {
    const name = this.props.tutorial.name;
    const { action, index, type } = data;

    if (type === EVENTS.STEP_AFTER && action === ACTIONS.CLOSE) {
      this.stopedTour(name);
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
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', () =>
      this.stopedTour(this.props.tutorial.name),
    );
  }
  componentDidUpdate() {
    document.addEventListener('keydown', () =>
      this.stopedTour(this.props.tutorial.name),
    );
  }
  render() {
    const { tutorial } = this.props;
    const getStepNumber = Number(localStorage.getItem(tutorial.name));

    return (
      <>
        <Joyride
          ref={this.tour}
          continuous
          showProgress
          showSkipButton
          stepIndex={getStepNumber}
          steps={Steps[StepItemType[tutorial.name]]}
          run={tutorial.run}
          callback={this.handleJoyrideCallback}
        />
      </>
    );
  }
}

// type injectMapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
type injectMapStateToProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(Tour);

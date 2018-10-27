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
  state = {
    run: true,
    action: '',
  };

  static getDerivedStateFromProps(nextProps: any, prevState: any): any {
    if (
      nextProps.tutorial.run !== prevState.run &&
      prevState.action === ACTIONS.CLOSE
    ) {
      console.log(1);

      return {
        run: prevState.run,
      };
    }
    console.log(2);

    return {
      run: nextProps.tutorial.run,
    };
  }
  handleJoyrideCallback = data => {
    const name = this.props.tutorial.name;
    const { action, index, type } = data;

    if (action === ACTIONS.CLOSE) {
      this.setState(state => ({
        run: false,
        action: ACTIONS.CLOSE,
      }));
    }
    if (type === EVENTS.TOUR_END && localStorage.getItem(name)) {
      localStorage.removeItem(name);
    } else if (type === EVENTS.STEP_AFTER || type === EVENTS.TARGET_NOT_FOUND) {
      localStorage.setItem(name, index + (action === ACTIONS.PREV ? -1 : 1));
    } else if (type === EVENTS.TOOLTIP_CLOSE) {
      localStorage.setItem(name, index + 1);
    }
  }

  render() {
    const { tutorial } = this.props;
    const getStepNumber = Number(localStorage.getItem(tutorial.name));

    return (
      <>
        <Joyride
          continuous
          showProgress
          showSkipButton
          stepIndex={getStepNumber}
          steps={Steps[StepItemType[tutorial.name]]}
          run={this.state.run}
          callback={this.handleJoyrideCallback}
        />
      </>
    );
  }
}

// type injectMapDispatchToProps = ReturnType<typeof mapDispatchToProps>;
type injectMapStateToProps = ReturnType<typeof mapStateToProps>;
export default connect(mapStateToProps)(Tour);

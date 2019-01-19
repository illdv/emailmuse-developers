import { resetTour } from './../renderer/component/Help/index';
export default (remove = null) => {
  if (remove) {
    localStorage.removeItem('isFirstTime');
  }
  if (!localStorage.getItem('isFirstTime')) {
    localStorage.setItem('isFirstTime', 'yes');
    resetTour();
  } else {
    localStorage.setItem('isFirstTime', 'no');
  }
  if (!localStorage.getItem('onboardingSteps')) {
    localStorage.setItem('onboardingSteps', JSON.stringify({ step: 0 }));
  }
};

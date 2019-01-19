export const onboardingSteps = () => {
  if (!localStorage.getItem('onboardingSteps')) {
    return 0;
  } else {
    const { step } = JSON.parse(localStorage.getItem('onboardingSteps'));
    return step;
  }
};

export const isFirstTime = () => localStorage.getItem('isFirstTime') === 'yes';

export const incrementOnboardingSteps = () => {
  const step = onboardingSteps();

  if (step === 3) {
    localStorage.setItem('onboardingSteps', JSON.stringify({ step: 'done' }));
  } else {
    const newValue = step + 1;
    localStorage.setItem('onboardingSteps', JSON.stringify({ step: newValue }));
  }
};

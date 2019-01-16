export const isFirstTime = () => {
  if (!localStorage.getItem('FirstTime')) {
    return 0;
  } else {
    const { yes } = JSON.parse(localStorage.getItem('FirstTime'));
    return yes;
  }
};

export const onRestTour = () => localStorage.getItem('ResTour') === 'yes';

export const incrementFirstTime = () => {
  const yes = isFirstTime();

  if (yes === 3) {
      localStorage.setItem('FirstTime', JSON.stringify({ yes: 'done'}));
  } else {
      const newValue = yes + 1;
      localStorage.setItem('FirstTime', JSON.stringify({ yes: newValue}));
  }
}

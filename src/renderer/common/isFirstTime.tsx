export const isFirstTime = () => {
  if (!localStorage.getItem('FirstTime')) {
    return 0;
  } else {
    const { yes } = JSON.parse(localStorage.getItem('FirstTime'));
    return yes;
  }
};

export const onRestTour = () => localStorage.getItem('ResTour') === 'yes';

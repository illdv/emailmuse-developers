export const isFirstTime = (n = null) => {
  const { yes } = JSON.parse(localStorage.getItem('FirstTime'));
  return !n ? localStorage.getItem('ResTour') === 'yes' : yes === n;
};

import { resetTour } from './../renderer/component/Help/index';
export default () => {
  if (!localStorage.getItem('ResTour')) {
    localStorage.setItem('ResTour', 'yes');
    resetTour();
  } else {
    localStorage.setItem('ResTour', 'no');
  }
  if (!localStorage.getItem('FirstTime')) {
    localStorage.setItem('FirstTime', JSON.stringify({ yes: 0 }));
  }
};

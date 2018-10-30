import React = require('react');

export enum classNamesSwipe {
  SWIPE_BODY = 'SWIPE_BODY',
}

export const swipe = disableBeacon => [
  {
    content:
      'These are our super awesome text! for ' + classNamesSwipe.SWIPE_BODY,
    placement: 'bottom',
    disableBeacon,
    styles: {
      options: {
        width: 900,
      },
    },
    target: '.' + classNamesSwipe.SWIPE_BODY,
    title: 'Our projects',
  },
];

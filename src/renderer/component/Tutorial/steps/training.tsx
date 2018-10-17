import React = require('react');

export enum classNamesTraining {
  TRAINING_BODY = 'TRAINING_BODY',
}

export const training = [
  {
    content: 'These are our super awesome text! for ' + classNamesTraining.TRAINING_BODY,
    placement: 'left',
    disableBeacon: true,
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesTraining.TRAINING_BODY,
    title: 'Our projects',
  },
];

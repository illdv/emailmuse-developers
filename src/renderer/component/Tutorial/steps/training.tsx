import React = require('react');

export enum classNamesTraining {
  TRAINING_BODY = 'TRAINING_BODY',
}

export const training = [
  {
    content: 'Improve your marketing with training from some ' +
    'of the brightest thought leaders in direct response marketing.',
    placement: 'left',
    disableBeacon: true,
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesTraining.TRAINING_BODY,
    title: 'Training',
  },
];

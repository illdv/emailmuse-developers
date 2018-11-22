import React = require('react');

export enum classNamesTraining {
  TRAINING_BODY = 'TRAINING_BODY',
}

export const training = disableBeacon => [
  {
    content: 'Write better emails and make more sales with' +
        ' advice from the top email marketing experts in the world.',
    placement: 'left',
    disableBeacon,
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesTraining.TRAINING_BODY,
    title: 'Training Library',
  },
];

import React = require('react');

export enum classNamesHelp {
  HELP_BODY = 'HELP_BODY',
}

export const help = disableBeacon => {
  console.log('help');

  return [
    {
      content: 'Help.',
      placement: 'left',
      disableBeacon,
      styles: {
        options: {
          width: 600,
        },
      },
      target: '.' + classNamesHelp.HELP_BODY,
      title: 'Help',
    },
  ];
};

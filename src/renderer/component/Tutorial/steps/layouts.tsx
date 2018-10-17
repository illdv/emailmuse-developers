import React = require('react');

export enum classNamesLayout {
  CREATE_LAYOUT = 'CREATE_LAYOUT',
  LAYOUT_BODY = 'LAYOUT_BODY',
}

export const layouts = [
  {
    content: 'These are our super awesome text! for ' + classNamesLayout.CREATE_LAYOUT,
    placement: 'top-end',
    disableBeacon: true,
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesLayout.CREATE_LAYOUT,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesLayout.LAYOUT_BODY,
    placement: 'left',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesLayout.LAYOUT_BODY,
    title: 'Our projects',
  },
];

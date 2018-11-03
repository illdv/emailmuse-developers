import React = require('react');

export enum classNamesLayout {
  CREATE_LAYOUT = 'CREATE_LAYOUT',
  LAYOUT_BODY = 'LAYOUT_BODY',
}

export const layouts = disableBeacon => [
  {
    content:
      'You can edit or delete existing layouts to fit your design needs.',
    disableBeacon,
    placement: 'left',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesLayout.LAYOUT_BODY,
    title: 'Our projects',
  },
  {
    content:
      'Turn one of your favorite emails into a layout you ' +
      'can use to quickly create more emails with the same ' +
      'style and even starter text.',
    placement: 'top-end',
    disableBeacon,
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesLayout.CREATE_LAYOUT,
    title: 'Create a New Custom Layout',
  },
];

import React = require('react');

export enum classNamesImage {
  UPLOAD = 'UPLOAD',
}

export const imageLibrary = disableBeacon => [
  {
    content:
      'Images in your library are available for you to use in your emails. ' +
      'Drag and drop images from your hard drive to add them to the library',
    disableBeacon,
    placement: 'top',
    styles: {
      options: {
        width: 900,
      },
    },
    target: '.' + classNamesImage.UPLOAD,
    title: 'Image Library',
  },
];

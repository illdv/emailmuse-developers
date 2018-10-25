import React = require('react');

export enum classNamesImage {
  UPLOAD = 'UPLOAD',
}

export const image = [
  {
    content: 'Images in your library are available for you to use in your emails. ' +
    'Drag and drop images from your hard drive to add them to the library',
    placement: 'top',
    styles: {
      options: {
        width: 900,
      },
    },
    target: '.' + classNamesImage.UPLOAD,
    title: 'Our projects',
  },
];

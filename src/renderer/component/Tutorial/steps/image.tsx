import React = require('react');

export enum classNamesImage {
  SEARCH = 'SEARCH',
  IMAGES = 'IMAGES',
  UPLOAD = 'UPLOAD',
}

export const image = [
  {
    content: 'These are our super awesome text! for ' + classNamesImage.SEARCH,
    placement: 'bottom',
    disableBeacon: true,
    styles: {
      options: {
        width: 900,
      },
    },
    target: '.' + classNamesImage.SEARCH,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesImage.IMAGES,
    placement: 'top',
    styles: {
      options: {
        width: 900,
      },
    },
    target: '.' + classNamesImage.IMAGES,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesImage.UPLOAD,
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

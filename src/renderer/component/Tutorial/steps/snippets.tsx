import React = require('react');

export enum classNamesSnippets {
  CREATE_SNIPPET = 'CREATE_SNIPPET',
  VIDEO = 'VIDEO',
}

export const snippets = [
  {
    content: 'These are our super awesome text! for ' + classNamesSnippets.CREATE_SNIPPET,
    placement: 'left',
    disableBeacon: true,
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesSnippets.CREATE_SNIPPET,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesSnippets.VIDEO,
    placement: 'left',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesSnippets.VIDEO,
    title: 'Our projects',
  },
];

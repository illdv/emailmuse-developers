import React = require('react');

export enum classNamesSnippets {
  CREATE_SNIPPET = 'CREATE_SNIPPET',
}

export const snippets = [
  {
    content: 'Click the plus sign to start creating a new Email Snippet.' +
    'You can type from scratch or copy and paste from an existing email.',
    placement: 'left',
    // disableBeacon: true,
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesSnippets.CREATE_SNIPPET,
    title: 'Our projects',
  },
];

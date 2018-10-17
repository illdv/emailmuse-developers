import React = require('react');

export enum classNamesEmails {
  ACCOUNT = 'ACCOUNT',
  EMAILS = 'EMAILS',
  IMAGE_LIBRARY = 'IMAGE_LIBRARY',
  SNIPPETS = 'SNIPPETS',
  LAYOUTS = 'LAYOUTS',
  SWIPE = 'SWIPE',
  TRAINING = 'TRAINING',
  EMAILS_HEADER = 'EMAILS_HEADER',
  EMAILS_BODY = 'EMAILS_BODY',
  NEW_FOLDER = 'NEW_FOLDER',
  NEW_EMAIL = 'NEW_EMAIL',
}

export const emails = [
  {
    content: <h2>Let's start the tour!</h2>,
    placement: 'center',
    disableBeacon: true,
    styles: {
      options: {
        zIndex: 10000,
      },
    },
    locale: { skip: 'skip!' },
    target: 'body',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesEmails.EMAILS,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.EMAILS,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesEmails.IMAGE_LIBRARY,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.IMAGE_LIBRARY,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesEmails.SNIPPETS,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.SNIPPETS,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesEmails.LAYOUTS,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.LAYOUTS,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesEmails.SWIPE,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.SWIPE,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesEmails.TRAINING,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.TRAINING,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesEmails.ACCOUNT,
    placement: 'top-start',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.ACCOUNT,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesEmails.EMAILS_BODY,
    placement: 'bottom',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.EMAILS_BODY,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesEmails.EMAILS_HEADER,
    placement: 'bottom',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.EMAILS_HEADER,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesEmails.NEW_FOLDER,
    placement: 'top-end',
    styles: {
      options: {
        width: 300,
      },
    },
    target: '.' + classNamesEmails.NEW_FOLDER,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesEmails.NEW_EMAIL,
    placement: 'top-end',
    styles: {
      options: {
        width: 300,
      },
    },
    target: '.' + classNamesEmails.NEW_EMAIL,
    title: 'Our projects',
  },
];

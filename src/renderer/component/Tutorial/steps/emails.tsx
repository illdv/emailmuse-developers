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
    content: 'All emails you write and save will be organized here',
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
    content: 'Images you want to use in your emails can be added and organized here',
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
    content: 'Got text and images you reuse in your emails frequently? ' +
      'Save them as a Snippet and add them to your emails in one click.',
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
    content: 'Give our emails a professional and consistent look. ' +
             'And you can save your own favorite custom layout for future use.',
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
    content: 'Email starter files and inspiration for sequences, save a sale, onboarding, webinars, launches, and more',
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
    content: 'Email marketing advice from the brightest minds',
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
    content: 'Update your email and settings here.',
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
    content: 'This is where you\'ll find emails that you\'ve written or loaded from the Swipes email library.',
    placement: 'bottom',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.EMAILS_BODY,
    title: 'Our projects',
  },
  // {
  //   content: 'These are our super awesome text! for ' + classNamesEmails.EMAILS_HEADER,
  //   placement: 'bottom',
  //   styles: {
  //     options: {
  //       width: 600,
  //     },
  //   },
  //   target: '.' + classNamesEmails.EMAILS_HEADER,
  //   title: 'Our projects',
  // },
  {
    content: 'Organize your emails into folders so you can find them quickly.',
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
    content: 'Just click on this icon when you want to create a new email from scratch.',
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

import React = require('react');

export enum classNamesEmails {
  ACCOUNT = 'ACCOUNT',
  HELP = 'HELP',
  EMAILS = 'EMAILS',
  IMAGE_LIBRARY = 'IMAGE LIBRARY',
  SNIPPETS = 'SNIPPETS',
  LAYOUTS = 'LAYOUTS',
  SWIPES = 'SWIPES',
  TRAINING = 'TRAINING',
  EMAILS_BODY = 'EMAILS_BODY',
  NEW_FOLDER = 'NEW_FOLDER',
  NEW_EMAIL = 'NEW_EMAIL',
}

export const emails = disableBeacon => [
  {
    content: <h2>Let's start the tour!</h2>,
    placement: 'center',
    disableBeacon,
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
    disableBeacon,
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.EMAILS,
    title: 'Emails',
  },
  {
    content:
      'Images you want to use in your emails can be added and organized here',
    disableBeacon,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.IMAGE_LIBRARY,
    title: 'Image Library',
  },
  {
    content:
      'Got text and images you reuse in your emails frequently? ' +
      'Save them as a Snippet and add them to your emails in one click.',
    disableBeacon,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.SNIPPETS,
    title: 'Snippets',
  },
  {
    content:
      'Give our emails a professional and consistent look. ' +
      'And you can save your own favorite custom layout for future use.',
    disableBeacon,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.LAYOUTS,
    title: 'Layouts',
  },
  {
    content:
      'Email starter files and inspiration for sequences, save a sale, onboarding, webinars, launches, and more',
    disableBeacon,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.SWIPES,
    title: 'Swipes',
  },
  {
    content: 'Email marketing advice from the brightest minds',
    disableBeacon,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.TRAINING,
    title: 'Training',
  },
  {
    content: 'Update your email and settings here.',
    disableBeacon,
    placement: 'top-start',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.ACCOUNT,
    title: 'Profile',
  },
  {
    content: 'help.',
    disableBeacon,
    placement: 'top-start',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.HELP,
    title: 'Help',
  },
  {
    content:
      'This is where you\'ll find emails that you\'ve written or loaded from the Swipes email library.',
    disableBeacon,
    placement: 'bottom',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesEmails.EMAILS_BODY,
    title: 'Emails',
  },
  {
    content: 'Organize your emails into folders so you can find them quickly.',
    disableBeacon,
    placement: 'top-end',
    styles: {
      options: {
        width: 300,
      },
    },
    target: '.' + classNamesEmails.NEW_FOLDER,
    title: 'Create a Folder',
  },
  {
    content:
      'Just click on this icon when you want to create a new email from scratch.',
    disableBeacon,
    placement: 'top-end',
    styles: {
      options: {
        width: 300,
      },
    },
    target: '.' + classNamesEmails.NEW_EMAIL,
    title: 'Create a New Email',
  },
];

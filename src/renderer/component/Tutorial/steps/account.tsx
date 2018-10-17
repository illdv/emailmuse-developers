import React = require('react');

export enum classNamesAccount {
  ACCOUNT_BODY = 'ACCOUNT_BODY',
  NAME = 'NAME',
  MAIL = 'MAIL',
  PASSWORD = 'PASSWORD',
  SAVE_NAME = 'SAVE_NAME',
  LOGOUT_BTN = 'LOGOUT_BTN',


}

export const account = [
  {
    content: 'These are our super awesome text! for ' + classNamesAccount.ACCOUNT_BODY,
    placement: 'left',
    disableBeacon: true,
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesAccount.ACCOUNT_BODY,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesAccount.MAIL,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesAccount.MAIL,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesAccount.NAME,
    placement: 'right',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesAccount.NAME,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesAccount.SAVE_NAME,
    placement: 'top',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesAccount.SAVE_NAME,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesAccount.PASSWORD,
    placement: 'top',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesAccount.PASSWORD,
    title: 'Our projects',
  },
  {
    content: 'These are our super awesome text! for ' + classNamesAccount.LOGOUT_BTN,
    placement: 'top',
    styles: {
      options: {
        width: 600,
      },
    },
    target: '.' + classNamesAccount.LOGOUT_BTN,
    title: 'Our projects',
  },
];

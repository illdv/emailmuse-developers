import React = require('react');

export enum classNamesAccount {
  ACCOUNT_BODY = 'ACCOUNT_BODY',
  NAME = 'NAME',
  MAIL = 'MAIL',
  PASSWORD = 'PASSWORD',
  SAVE_NAME = 'SAVE_NAME',
  LOGOUT_BTN = 'LOGOUT_BTN',
}

export const account = disableBeacon => {
  return [
    {
      content:
        'You can view and update your profile settings from this screen.',
      placement: 'left',
      disableBeacon,
      styles: {
        options: {
          width: 600,
        },
      },
      target: '.' + classNamesAccount.ACCOUNT_BODY,
      title: 'Profile Settings',
    },
  ];
};

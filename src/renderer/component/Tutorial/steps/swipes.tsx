export enum classNamesSwipe {
  SWIPE_HEAD = 'SWIPE_HEAD',
  SWIPE_BODY = 'SWIPE_BODY',
}

export const swipes = disableBeacon => [
  // {
  //   content:
  //     'There\'s no need to start from scratch when you ' +
  //     'can get inspiration and guidance from professional written email swipes.',
  //   placement: 'bottom',
  //   disableBeacon,
  //   styles: {
  //     options: {
  //       width: 900,
  //     },
  //   },
  //   target: '.' + classNamesSwipe.SWIPE_HEAD,
  //   title: 'Email Swipes',
  // },
  {
    content:
      'Find a row that looks like it will help you achieve your goal and you can read ' +
      'the email swipes, and choose to use all of them or just some of them.',
    placement: 'bottom',
    disableBeacon,
    styles: {
      options: {
        width: 900,
      },
    },
    target: '.' + classNamesSwipe.SWIPE_BODY,
    title: 'Read and Use Swipes',
  },
];

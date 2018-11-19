export enum classNamesSwipeLocked {
  SWIPE_LOCKED_BODY = 'SWIPE_LOCKED_BODY',
}

export const swipesLocked = disableBeacon => [
  {
    content:
      'This tab is locked.',
    placement: 'bottom',
    disableBeacon,
    styles: {
      options: {
        width: 900,
      },
    },
    target: '.' + classNamesSwipeLocked.SWIPE_LOCKED_BODY,
    title: 'Email Locked Swipes',
  },
];

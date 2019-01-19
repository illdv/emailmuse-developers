import * as React from 'react';
import { MenuItemType } from '../Menu/flux/interface';
import { Button } from '@material-ui/core';
import { onboardingSteps } from 'src/renderer/common/isFirstTime';

export default ({ selectItem }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      onClick={selectItem(MenuItemType.emails)}
      color='primary'
      variant='contained'
    >
      {onboardingSteps() === 'done' ? 'Got it! Let`s Go' : 'Let`s Go!'}
    </Button>
  </div>
);

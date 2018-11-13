import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { config } from 'dotenv';
config();
import Root from './root';
import Application from 'src/renderer/component/Application';

document.title = `EmailMuse ${APP_VERSION} ${IS_PRODUCTION ? '' : 'develop'}`;

ReactDOM.render(
  <Root>
    <Application />
  </Root>,
  document.getElementById('root'),
);

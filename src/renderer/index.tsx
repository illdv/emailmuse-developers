import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Root from './root';
import Application from 'src/renderer/component/Application';

document.title = `Emailer ${APP_VERSION} ${IS_PRODUCTION ? '' : 'develop'}`;

ReactDOM.render(<Root><Application/></Root>, document.getElementById('root'));

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { Router as RouterConnect } from 'react-router';
import { whyDidYouUpdate } from 'why-did-you-update';

import reducer from './flux/rootReducers';
import rootSaga from './flux/rootSaga';
import Application from 'src/renderer/component/Application';

/*if (!IS_PRODUCTION) {
  whyDidYouUpdate(React);
}*/

document.title = `Emailer ${APP_VERSION} ${IS_PRODUCTION ? '' : 'develop'}`;

const sagaMiddleware = createSagaMiddleware();
const history        = createHistory();

const routeMiddleware = routerMiddleware(history);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(routeMiddleware, sagaMiddleware)),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <RouterConnect history={history}>
      <Application/>
    </RouterConnect>
  </Provider>,
  document.getElementById('root'),
);

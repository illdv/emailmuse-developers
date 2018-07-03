import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from './flux/rootReducers';
import rootSaga from './flux/rootSaga';
import Application from 'src/renderer/component/Application';
import { HashRouter as Router } from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

document.title = `Emailer ${APP_VERSION} ${IS_PRODUCTION ? '' : 'develope'}`;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Application/>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

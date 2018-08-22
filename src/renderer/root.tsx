import * as React from 'react';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Router as RouterConnect } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import reducer from './flux/rootReducers';
import rootSaga from 'src/renderer/flux/rootSaga';

const history = createHistory();
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(routeMiddleware, sagaMiddleware)),
);
sagaMiddleware.run(rootSaga);

const Root: React.SFC<{ children: any }> = ({ children }) => {
  return (
    <Provider store={store}>
      <RouterConnect history={history}>
        {children}
      </RouterConnect>
    </Provider>
  );
};

export default Root;

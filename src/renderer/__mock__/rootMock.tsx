import * as React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducer from 'src/renderer/flux/rootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import { Router as RouterConnect } from 'react-router';

const history = createHistory();

const routeMiddleware = routerMiddleware(history);
const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(routeMiddleware)),
);

export const RootMock = ({ children }) => (
  <Provider store={store}>
    <RouterConnect history={history}>
      {children}
    </RouterConnect>
  </Provider>
);

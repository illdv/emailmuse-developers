import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from './renderer/flux/rootReducers';
import rootSaga from './renderer/flux/rootSaga';
import { loadStore, saveStore } from 'src/LocalStorage';
import MainLayout from 'src/renderer/component/Application';

(async () => {

  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    reducer,
    await loadStore(),
    composeWithDevTools(applyMiddleware(sagaMiddleware)));

  store.subscribe(() => {
    const state = store.getState();
    saveStore(state);
  });

  sagaMiddleware.run(rootSaga);

  ReactDOM.render(
    <Provider store={store}>
      <MainLayout/>
    </Provider>,
    document.getElementById('root')
  );
})();
import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas/root';
import rootReducer from './reducers';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(history, initialState) {
  const storeEnhancers = [];
  if (process.env.NODE_ENV !== 'production') {
    console.log(`=-=-=-= The current application is running in ${process.env.NODE_ENV} mode =-=-=-=`); // eslint-disable-line
    storeEnhancers.push(typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f);
  }

  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(
        sagaMiddleware,
        thunkMiddleware
      ),
      ...storeEnhancers
    )
  );

  sagaMiddleware.run(rootSaga);

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers'); // eslint-disable-line

      store.replaceReducer(nextRootReducer.default || nextRootReducer);
    });
  }

  return store;
}

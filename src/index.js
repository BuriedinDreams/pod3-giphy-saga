import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  // Dispatch/put listeners
  yield takeEvery('FETCH_SEARCH', fetchSearch)
}

function* fetchSearch (action) {
  console.log('fetchSearch', action.payload);
} // end fetchSearch

// Redux store
const storeInstance = createStore(
  combineReducers({  }),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}>
  <App /> 
  </Provider>,
  document.getElementById('root'));


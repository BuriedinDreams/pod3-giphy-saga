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
  yield takeEvery('FETCH_FAVORITES', fetchFavorites)
  // this will be for the PUT
  yield takeEvery('', )
}

function* fetchFavorites() {
  try{
    let response = yield axios.get('/api/favorite');
    yield put({
      type: 'SET_FAVORITES',
      payload: response.data
    });
  } 
  catch (err){
    console.log('fetch error', err);
  }
}

const favoriteReducer = (state = [], action) => {
  if(action.type === 'SET_FAVORITES') {
    return action.payload
  }
  return state;
}

// Redux store
const storeInstance = createStore(
  combineReducers({ 
    favoriteReducer,
  }),
  applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={storeInstance}>
    <App />
  </Provider>,
  document.getElementById('root'));


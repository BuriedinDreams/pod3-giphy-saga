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

/* ---- SAGAS ---- */

function* rootSaga() {
  // Dispatch/put listeners
  yield takeEvery('SEND_SEARCH', sendSearch);
  yield takeEvery('FETCH_FAVORITES', fetchFavorites);
  yield takeEvery('CHANGE_CATEGORY', changeCategory);
} // end rootSaga

function* sendSearch(action) {
  // send search request to /api/search/{query}
  let response = yield axios.get(`/api/search/${action.payload}`); // payload = phrase/word that the user searched
  //console.log(response);

  try {
    yield put({
      type: 'SET_SEARCH',
      payload: response.data
    })
  } catch (err) {
    console.log('Error in search', err);
  }
} // end sendSearch

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
} // end fetchFavorites

function* changeCategory(action) {
  console.log('Gif ID', action.payload.favoriteGifId); 
  try {
    yield axios.put(`/api/favorite/${action.payload.favoriteGifId}`, action.payload);
  }
  catch (err) {
    console.log('Saga PUT error', err);
  }
} // end changeCategory

// function* deleteFavorite(action) {
//   try {
//     yield axios.delete(`api/plant/${action.payload}`);
// }

/* ---- REDUCERS ---- */

const searchReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.payload; 
    default:
      return state;
  }
}; // end searchReducer

const favoriteReducer = (state = [], action) => {
  if(action.type === 'SET_FAVORITES') {
    return action.payload
  }
  return state;
}; // end favoriteReducer

// Redux store
const storeInstance = createStore(
  combineReducers({ 
    searchReducer, 
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

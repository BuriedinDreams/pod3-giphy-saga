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

/* ---- SAGAS ---- */  // Sagas are used to store information to be sent to the server.

function* rootSaga() {
  // Dispatch/put listeners
  yield takeEvery('SEND_SEARCH', sendSearch);
  yield takeEvery('FETCH_FAVORITES', fetchFavorites);
  yield takeEvery('CHANGE_CATEGORY', changeCategory);
  yield takeEvery('ADD_FAVORITE', addFavorite);
} // end rootSaga

function* sendSearch(action) {
  // send search request to /api/search/{query}
  let response = yield axios.get(`/api/search/${action.payload}`); // payload = phrase/word that the user searched
  //console.log(response);

  try {
    yield put({
      type: 'SET_SEARCH',
      payload: response.data // this response is used so the useSelector is able to retrieve the information
    })
  } catch (err) {
    console.log('Error in search', err);
  }
} // end sendSearch

function* addFavorite(action) { 
  console.log('in addFavorite', action.payload)
  
  // post favorite to database
  try {
    yield axios.post(`/api/favorite/`, action.payload ); // this is the url from the user clicking the fav button.

     // update favoriteReducer
    yield put({ // put is dispatching the information to be grabbed by whoever.
      type: 'FETCH_FAVORITES'  // this is being caught by RootSaga which is then being sent to function fetchFavorites()
    });
  } catch(err) {
    console.log('Error in Fav post', err);
  }

}; // end addFavorite

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
  if(action.type === 'SET_SEARCH') {
    return action.payload // this is returning the lists of GIF's
  }

  return state;
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

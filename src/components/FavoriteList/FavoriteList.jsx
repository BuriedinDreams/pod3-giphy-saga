import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import FavoriteItem from '../FavoriteItem/FavoriteItem';
import './FavoriteList.css';

function FavoriteList() {
  const dispatch = useDispatch();

  // Grab the list of favorites from the redux store
  const favoriteList = useSelector( store => store.favoriteReducer);
  console.log('favoriteList', favoriteList);

  // on load, get(fetch)
  // set the favorites on the page
  useEffect(() => {
    getFavorites();
  }, []);

  // called on load to set favorites on page
  const getFavorites = () => {
    // Send bat-signal to redux saga
    dispatch({
      type: 'FETCH_FAVORITES'
    });
  }

  return (
    <div>
      <div id="favorite-gif-container"> 
        {/* Loop through the favorites List from the store */}
        {favoriteList.map((favoriteGif) => {
          return (
            <FavoriteItem key={favoriteGif.id} favoriteGif={favoriteGif}/>
            );
        })}
      </div>
    </div>
  )
}

export default FavoriteList;
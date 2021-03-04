import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import FavoriteItem from '../FavoriteItem/FavoriteItem';
import './FavoriteList.css';

function FavoriteList() {
  const dispatch = useDispatch();

  const favoriteList = useSelector( store => store.favoriteReducer);
  console.log('favoriteList', favoriteList);

  useEffect(() => {
    getFavorites();
  }, []);

  const getFavorites = () => {
    // Send bat-signal to redux saga
    dispatch({
      type: 'FETCH_FAVORITES'
    });
  }

  return (
    <div>
      <div id="favorite-gif-container"> 
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
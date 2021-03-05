import React, {useState} from 'react';
import { useDispatch } from 'react-redux';

function FavoriteItem({favoriteGif}) {
  const dispatch = useDispatch();
  
  // const [newCategory, setNewCategory] = useState('');

  const handleChange = (event) => {
    console.log('event.target.val', event.target.value);
    // assign drop-down value to a variable
    let newCategory = event.target.value
    categoryChange(newCategory);
  }

  // handles the category change
  // Dispatch the new category to eventually PUT to DB
  const categoryChange = (category) => {
    console.log('New category', category);
    dispatch({
      type: 'CHANGE_CATEGORY',
      payload: {category: category, favoriteGifId: favoriteGif.id}
    })
  }
  
  return ( 
  <div className="favorite-gifs">
    <img src={favoriteGif.url} />
    <br/>
    <label htmlFor="categories"> Choose a Category: </label>
    <select id="categories" onChange={handleChange}>
      <option value="funny">Funny</option>
      <option value="cohort">Cohort</option>
      <option value="cartoon">Cartoon</option>
      <option value="nsfw">NSFW</option>
      <option value="meme">Meme</option>
    </select>
    {/* <button onClick={handleClick}>Confirm</button> */}
  </div>
  )
}

export default FavoriteItem;

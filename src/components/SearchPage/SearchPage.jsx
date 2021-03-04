import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SearchPage.css'

import SearchBar from '../SearchBar/SearchBar'
import SearchResults from '../SearchResults/SearchResults'


function SearchPage() {
  const dispatch = useDispatch();

  const [ newSearch, setNewSearch ] = useState('');

  function handleSubmit(event) {
    //console.log('Im clicked', newSearch);
    event.preventDefault();
    
    dispatch({
      type: 'SEND_SEARCH',
      payload: newSearch // This is the phrase/word that the user searched
    })

  } // end handleSubmit

  return (
  <div>
    <h3>Search</h3>

    <form onSubmit={handleSubmit} >
      <input 
        type="text"
        value={newSearch}
        onChange={(evt) => setNewSearch(evt.target.value)}
      ></input>

      <button >Search</button>
    </form> 

    <SearchResults/>
  </div>
  );
}

export default SearchPage;


// This is going to 

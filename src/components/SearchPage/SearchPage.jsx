import { useState } from 'react';
import { useDispatch } from 'react-redux';
import './SearchPage.css';

import SearchResults from '../SearchResults/SearchResults';

import { TextField, Button } from '@material-ui/core/';

function SearchPage() {
  const dispatch = useDispatch();

  const [newSearch, setNewSearch] = useState('');

  function handleSubmit(event) {
    //console.log('Im clicked', newSearch);
    event.preventDefault();

    dispatch({
      type: 'SEND_SEARCH',
      payload: newSearch, // This is the phrase/word that the user searched
    });
  } // end handleSubmit

  return (
    <div>
      <h3>Search</h3>

      <form onSubmit={handleSubmit}>
        <TextField
          id="filled-basic"
          className="searchInput"
          label="Search"
          variant="filled"
          type="text"
          size="small"
          value={newSearch}
          onChange={(evt) => setNewSearch(evt.target.value)}
        />
        &nbsp;
        <Button
          type="submit"
          className="searchBtn"
          variant="outlined"
          color="secondary"
        >
          Search GIFS
        </Button>
      </form>

      <SearchResults />
    </div>
  );
}

export default SearchPage;

// This is going to

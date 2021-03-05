import { useDispatch, useSelector } from 'react-redux';
import './SearchResults.css';

import { Favorite } from '@material-ui/icons';

function SearchResults() {
  const dispatch = useDispatch();

  const searchResults = useSelector((store) => store.searchReducer);

  const favoriteGif = (url) => {
    //console.log(url);

    // dispatch to index
    dispatch({
      type: 'ADD_FAVORITE',
      payload: { url }, // this is taking what the user clicked as their favorite GIF
      // and sends it to index.js/ reducer.
    });
  }; // end favoriteGif

  return (
    <div id="gifcontainer">
      {searchResults.map((result, i) => {
        return (
          <div key={i} className="gifblock">
            <img src={result.images.fixed_height.url} />
            <br />
            <button
              onClick={() => favoriteGif(result.images.fixed_height.url)}
              className="likebtn"
            >
              <Favorite />
            </button>
            {/*  this button is capturing the url of the GIF --
           and saving it so it may be sent to the server.  */}
          </div>
        );
      })}
    </div>
  );
}

export default SearchResults;

// this is going to be our results | giphys

import { useDispatch, useSelector } from 'react-redux';

function SearchResults () {
  const searchResults = useSelector((store) => store.searchReducer);

  return (
  <div>
    {searchResults.map((result, i) => {
      return(
        <div key={i}>
          <img src={result.images.fixed_height.url}/>
          <button>favorite</button>
        </div>)
    })}
  </div>
  );
}

export default SearchResults




// this is going to be our results | giphys 
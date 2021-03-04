function FavoriteItem({favoriteGif}) {
  
  return ( 
  <div class="favorite-gifs">
    <img src={favoriteGif.url} />
  </div>
  )
}

export default FavoriteItem;

function FavoriteItem({favoriteGif}) {
  
  return ( 
  <div>
    <img src={favoriteGif.url} />
  </div>
  )
}

export default FavoriteItem;

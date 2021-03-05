import React from 'react';
import FavoriteList from '../FavoriteList/FavoriteList';

import { Container } from '@material-ui/core/';

function FavoritePage() {
  return (
    <Container maxWidth="md">
      <h3>Favorite Page</h3>
      <FavoriteList />
    </Container>
  );
}

export default FavoritePage;

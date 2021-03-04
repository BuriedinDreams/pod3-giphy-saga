import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import Header from '../Header/Header';
import SearchPage from '../SearchPage/SearchPage';
import FavoritePage from '../FavoritePage/FavoritePage';

function App(props) {
  return (
    <div>
      <Router>
        <Header />

        <Route path="/" exact>
          <SearchPage />
        </Route>

        <Route path="/favorites">
          <FavoritePage />
        </Route>
      </Router>
    </div>
  );
}

export default App;

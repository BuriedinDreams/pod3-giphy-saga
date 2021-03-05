import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div id="banner">
      <h1>Giphy Saga</h1>
      <nav>
        <span>
          <Link to="/" className="navigation">
            Search
          </Link>
        </span>
        <span>
          <Link to="/favorites" className="navigation">
            Favorites
          </Link>
        </span>
      </nav>
    </div>
  );
}

export default Header;

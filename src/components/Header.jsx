import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import debounce from "lodash.debounce";

import "../styles/header.scss";

const Header = ({ searchMovies }) => {
  const { starredMovies } = useSelector((state) => state.starred);

  const [searchTerm, setSearchTerm] = useState("");

  // Debounced function using useCallback to prevent recreation
  const debouncedSearch = useCallback(
    debounce((value) => {
      searchMovies(value);
    }, 300),
    [searchMovies]
  );

  // Cleanup debounce when component unmounts
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  // Update search term and trigger debounced search
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    debouncedSearch(e.target.value);
  };

  return (
    <header>
      <Link to="/" data-testid="home" onClick={() => searchMovies("")}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink
          to="/starred"
          data-testid="nav-starred"
          className="nav-starred"
        >
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <input
          type="search"
          data-testid="search-movies"
          onChange={handleInputChange}
          value={searchTerm}
          className="form-control rounded"
          placeholder="Search movies..."
          aria-label="Search movies"
          aria-describedby="search-addon"
        />
      </div>
    </header>
  );
};

export default Header;

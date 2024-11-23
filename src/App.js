import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  createSearchParams,
  useSearchParams,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "reactjs-popup/dist/index.css";
import { fetchMovies, clearMovies } from "./data/moviesSlice";
import TrailerModal from "./components/TrailerModal";
import Header from "./components/Header";
import Movies from "./components/Movies";
import Starred from "./components/Starred";
import WatchLater from "./components/WatchLater";
import { useMovieTrailer } from "./hooks/useMovieTrailer";
import "./app.scss";

const App = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const navigate = useNavigate();

  const movies = useSelector((state) => state.movies);

  const [isOpen, setOpen] = useState(false);
  const {
    videoKey,
    getMovieTrailer,
    error: errorTrailer,
    isLoading: isLoadingTrailer,
  } = useMovieTrailer();

  useEffect(() => {
    if (movies.movies.results.length === 0) {
      getMovies();
    }
    // eslint-disable-next-line
  }, [movies.movies.results.length]);

  const getMovies = () => {
    dispatch(fetchMovies({ searchQuery, page: 1 }));
  };

  const fetchMoreMovies = (done) => {
    const { page, total_pages } = movies.movies;

    if (movies.fetchStatus === "loading" || page >= total_pages) {
      console.log("Skipping fetch: Already loading or no more pages.");
      done();
      return;
    }

    const nextPage = page + 1;

    dispatch(fetchMovies({ searchQuery, page: nextPage })).then(() => {
      console.log(`Fetched page ${nextPage}`);
      done();
    });
  };

  const getSearchResults = (query) => {
    dispatch(clearMovies());

    dispatch(fetchMovies({ searchQuery: query, page: 1 }));
    if (query) {
      setSearchParams(createSearchParams({ search: query }));
    } else {
      setSearchParams();
    }
  };

  const searchMovies = (query) => {
    navigate("/");
    getSearchResults(query);
  };

  const viewTrailer = async (movie) => {
    setOpen(true);
    await getMovieTrailer(movie.id);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <Header
        searchMovies={searchMovies}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <div className="container">
        <TrailerModal
          isOpen={isOpen}
          videoKey={videoKey}
          closeModal={closeModal}
          errorTrailer={errorTrailer}
          isLoadingTrailer={isLoadingTrailer}
        />

        <Routes>
          <Route
            path="/"
            element={
              <Movies
                movies={movies}
                fetchMoreMovies={fetchMoreMovies}
                viewTrailer={viewTrailer}
              />
            }
          />
          <Route
            path="/starred"
            element={<Starred viewTrailer={viewTrailer} />}
          />
          <Route
            path="/watch-later"
            element={<WatchLater viewTrailer={viewTrailer} />}
          />
          <Route
            path="*"
            element={<h1 className="not-found">Page Not Found</h1>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;

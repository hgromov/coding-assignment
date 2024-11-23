import { useDispatch, useSelector } from "react-redux";
import starredSlice from "../data/starredSlice";
import watchLaterSlice from "../data/watchLaterSlice";
import placeholder from "../assets/not-found-500X750.jpeg";

const Movie = ({ movie, viewTrailer }) => {
  const state = useSelector((state) => state);
  const { starred, watchLater } = state;
  const { starMovie, unstarMovie } = starredSlice.actions;
  const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions;

  const dispatch = useDispatch();

  const isStarred = starred.starredMovies.some((m) => m.id === movie.id);

  const handleStar = () => {
    if (isStarred) {
      dispatch(unstarMovie(movie));
    } else {
      dispatch(
        starMovie({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
        })
      );
    }
  };

  const handleWatchLater = () => {
    const isInWatchLater = watchLater.watchLaterMovies.some(
      (m) => m.id === movie.id
    );

    if (isInWatchLater) {
      dispatch(removeFromWatchLater(movie));
    } else {
      dispatch(
        addToWatchLater({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          release_date: movie.release_date,
          poster_path: movie.poster_path,
        })
      );
    }
  };

  return (
    <div className="movie-card">
      <div className="card">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
              : placeholder
          }
          alt={`${movie.title} poster`}
          className="poster"
        />

        <div className="hover-content">
          <div className="overview">
            {movie.overview || "No description available."}
          </div>
          <div className="year">
            {movie.release_date?.substring(0, 4) || "N/A"}
          </div>
          <div className="buttons">
            <button
              className={`btn btn-star ${isStarred ? "starred" : ""}`}
              onClick={handleStar}
            >
              ★
            </button>
            <button className="btn btn-watch-later" onClick={handleWatchLater}>
              {watchLater.watchLaterMovies.map((m) => m.id).includes(movie.id)
                ? "✔ Remove"
                : "Watch Later"}
            </button>
            <button
              className="btn btn-view-trailer"
              onClick={() => viewTrailer(movie)}
            >
              View Trailer
            </button>
          </div>
        </div>
      </div>

      <h6 className="title">{movie.title}</h6>
    </div>
  );
};

export default Movie;

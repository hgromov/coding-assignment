import useInfiniteScroll from "../hooks/useInfiniteScroll";
import Movie from "./Movie";
import "../styles/movies.scss";

const Movies = ({ movies, fetchMoreMovies, viewTrailer }) => {
  const [observerRef] = useInfiniteScroll((done) => fetchMoreMovies(done));

  return (
    <>
      <div className="movies-wrapper">
        {movies.movies.results.map((movie) => (
          <Movie movie={movie} key={movie.id} viewTrailer={viewTrailer} />
        ))}
      </div>
      {movies.fetchStatus === "error" && <div>Failed to load movies.</div>}
      <div ref={observerRef} className="loading-trigger">
        Loading more movies...
      </div>
    </>
  );
};

export default Movies;

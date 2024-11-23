import { ENDPOINT,  ENDPOINT_DISCOVER, ENDPOINT_SEARCH, API_KEY } from "./constants";

/**
 * Fetch movies based on searchQuery or fetch popular movies if no query is provided.
 * @param {string} [searchQuery] - The search query (optional).
 * @param {number} [page=1] - The page number to fetch (optional, default: 1).
 * @returns {Promise<Object>} - API response containing movies.
 */
export const fetchMoviesFromApi = async (searchQuery = "", page = 1) => {
  const endpoint = searchQuery
    ? `${ENDPOINT_SEARCH}&query=${encodeURIComponent(searchQuery)}`
    : ENDPOINT_DISCOVER;

  const apiUrl = `${endpoint}&api_key=${API_KEY}&page=${page}`;
  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Error fetching movies: ${response.statusText}`);
  }
  return response.json();
};

/**
 * Fetch movie trailer data for a specific movie ID.
 * @param {string} id - The movie ID.
 * @returns {Promise<Object>} - Trailer data.
 */
export const fetchMovieTrailer = async (id) => {
  const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
  const response = await fetch(URL);

  if (!response.ok) {
    throw new Error(`Error fetching trailer: ${response.statusText}`);
  }
  return response.json();
};

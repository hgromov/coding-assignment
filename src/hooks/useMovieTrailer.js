import { useState } from "react";
import { fetchMovieTrailer } from "../api";

export const useMovieTrailer = () => {
  const [videoKey, setVideoKey] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getMovieTrailer = async (id) => {
    try {
      setIsLoading(true);
      setError(null);
      setVideoKey(null);

      const videoData = await fetchMovieTrailer(id);
      if (videoData.videos && videoData.videos.results.length) {
        const trailer = videoData.videos.results.find(
          (vid) => vid.type === "Trailer"
        );
        setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key);
      } else {
        setVideoKey(null);
        setError("No trailer available for this movie.");
      }
    } catch (err) {
      console.error("Error fetching trailer:", err);
      setError("Failed to fetch the trailer. Please try again later.");
      setVideoKey(null);
    } finally {
      setIsLoading(false);
    }
  };

  return { videoKey, isLoading, error, getMovieTrailer };
};

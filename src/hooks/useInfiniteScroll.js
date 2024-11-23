import { useEffect, useState, useRef } from "react";

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsFetching(true);
        }
      },
      { rootMargin: "400px" }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => setIsFetching(false));
  }, [isFetching, callback]);

  return [observerRef];
};

export default useInfiniteScroll;

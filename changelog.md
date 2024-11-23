# Changelog

All notable changes to this project will be documented in this file.

## [1.1.1] - 2024-11-22
### Chore
- Formatted codebase using Prettier for consistent code styling.

- Replaced `node-sass` with `sass` to address deprecation warnings and ensure compatibility with modern tooling.

- Added named export of reducers in slice files (`moviesSlice`, `starredSlice`, `watchLaterSlice`).

- Added named export of `store` for better consistency and to align with best practices.

- Added Middleware for logging actions and handling errors in the Redux store for better debugging and error management.

- Replaced the inline YouTube player with a modal using react-modal lib and moved to separate component.

- Added isLoading state for trailer modal and error hendling for get trailer functionality. logic of fetching and error hendling decomposed to api and custom hook.

- Implemented a responsive grid layout for the movie list to ensure proper alignment and scalability across devices.

- Implemented the `useInfiniteScroll` custom hook to enable infinite scrolling functionality with `IntersectionObserver`. 

- Added a `loading-trigger` element in the `Movies` component to act as the observer target for fetching additional movie data.

- Integrated infinite scrolling into the `Movies` component to load additional movies dynamically when the user scrolls near the bottom of the page.

- Configured `rootMargin` in the observer to trigger pre-loading 400px before the target enters the viewport.

- Centralized all http requests in `api.js`

### Fixed
- Removed the link wrapping the input field in the header as it was preventing the native clear (X) button functionality in the `search` input field.

- Moved the initial call to the `searchMovies` function into a `useEffect` hook to prevent redundant requests triggered on every click.

- Added debounce to `searchMovies` to prevent redundant requests on each keypress.

- Corrected the `ENDPOINT_DISCOVER` URL by removing the extra `/` before query parameters, resolving the `404 Not Found` error when fetching movies.

- Optimized state selection in `App` component by selecting only the `movies` slice from Redux, improving performance and readability.

- Added error handling to the `fetchMovies` thunk to properly reject invalid API responses and set an error message in the Redux state.

- Updated the `movies` slice to include `fetchError` for better error visibility in the UI.

- Removed unnecessary `setOpen(true)` in `viewTrailer`.

- Removed unnecessary `closeCard` in App.
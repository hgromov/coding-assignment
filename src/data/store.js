import { configureStore } from "@reduxjs/toolkit";
import { moviesReducer } from "./moviesSlice";
import { starredReducer } from "./starredSlice";
import { watchLaterReducer } from "./watchLaterSlice";

const loggerMiddleware = (storeAPI) => (next) => (action) => {
  console.log("Dispatching action:", action);
  const result = next(action);
  console.log("Updated state:", storeAPI.getState());
  return result;
};

const errorHandlingMiddleware = (storeAPI) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.error("Caught an exception!", error);
    throw error;
  }
};

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    starred: starredReducer,
    watchLater: watchLaterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware, errorHandlingMiddleware),
});

export default store;

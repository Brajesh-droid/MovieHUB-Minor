import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducers/movieSlice';
import tvReducer from './reducers/tvSlice';
import peopleReducer from './reducers/personSlice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    person: peopleReducer, // fixed typo
  },
});

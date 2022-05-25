import { Action, createReducer, on } from '@ngrx/store';
import { Movie } from 'src/app/models';
import {
  addMovieSuccess,
  deleteMovieSuccess,
  editMovieSuccess,
  finishWatchingSuccess,
  loadMoviesSuccess,
  startWatchingSuccess,
} from './movies.actions';
import { MoviesState, initialState } from './movies.state';

const _moviesReducer = createReducer(
  initialState,
  on(loadMoviesSuccess, (state, action) => {
    return {
      ...state,
      movies: action.movies,
    };
  }),
  on(deleteMovieSuccess, (state, { id }) => {
    const updatedMovies = state.movies.filter((movie) => {
      return movie.id !== id;
    });
    return {
      ...state,
      movies: updatedMovies,
    };
  }),
  on(addMovieSuccess, (state, action) => {
    const addedMovie: Movie = {
      ...action.movie,
    };
    return {
      ...state,
      movies: [...state.movies, addedMovie],
    };
  }),
  on(
    ...[editMovieSuccess, startWatchingSuccess, finishWatchingSuccess],
    (state, action) => {
      const updatedMovies = state.movies.map((movie) => {
        return action.movie.id === movie.id ? action.movie : movie;
      });

      return {
        ...state,
        movies: updatedMovies,
      };
    }
  )
);

export function moviesReducer(state: MoviesState | undefined, action: Action) {
  return _moviesReducer(state, action);
}

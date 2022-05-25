import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Movie } from 'src/app/models';
import { MoviesState } from './movies.state';

export const MOVIES_STATE_NAME = 'movies';
const getMoviesState = createFeatureSelector<MoviesState>(MOVIES_STATE_NAME);

export const getMovies = createSelector(getMoviesState, (state) => {
  return state.movies;
});

export const getMovieById = createSelector(
  getMoviesState,
  (state: any, props: any) => {
    return state.movies.find((movie: Movie) => movie.id === props.id);
  }
);
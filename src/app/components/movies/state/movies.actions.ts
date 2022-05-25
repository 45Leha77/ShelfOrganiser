import { createAction, props } from '@ngrx/store';
import { Movie } from 'src/app/models';

export const dummyAction = createAction('[dummy action]');

export const LOAD_MOVIES = '[Movies] load movies';
export const LOAD_MOVIES_SUCCESS = '[Movies] load movies success';

export const DELETE_MOVIE = '[Movies] delete movie';
export const DELETE_MOVIE_SUCCESS = '[Movies] delete movie success';

export const ADD_MOVIE = '[Movies] add movie';
export const ADD_MOVIE_SUCCESS = '[Movies] add movie success';

export const EDIT_MOVIE = '[Movies] edit movie';
export const EDIT_MOVIE_SUCCESS = '[Movies] edit movie success';

export const START_WATCHING = '[Movies] start watching';
export const START_WATCHING_SUCCESS = '[Movies] start watching success';

export const FINISH_WATCHING = '[Movies] finish watching';
export const FINISH_WATCHING_SUCCESS = '[Movies] finish watching success';

export const loadMovies = createAction(LOAD_MOVIES);
export const loadMoviesSuccess = createAction(
  LOAD_MOVIES_SUCCESS,
  props<{ movies: Movie[] }>()
);

export const deleteMovie = createAction(DELETE_MOVIE, props<{ id: string }>());
export const deleteMovieSuccess = createAction(
  DELETE_MOVIE_SUCCESS,
  props<{ id: string }>()
);

export const addMovie = createAction(ADD_MOVIE, props<{ movie: Movie }>());
export const addMovieSuccess = createAction(
  ADD_MOVIE_SUCCESS,
  props<{ movie: Movie }>()
);

export const editMovie = createAction(EDIT_MOVIE, props<{ movie: Movie }>());
export const editMovieSuccess = createAction(
  EDIT_MOVIE_SUCCESS,
  props<{ movie: Movie }>()
);

export const startWatching = createAction(
  START_WATCHING,
  props<{ movie: Movie }>()
);
export const startWatchingSuccess = createAction(
  START_WATCHING_SUCCESS,
  props<{ movie: Movie }>()
);

export const finishWatching = createAction(
  FINISH_WATCHING,
  props<{ movie: Movie }>()
);
export const finishWatchingSuccess = createAction(
  FINISH_WATCHING_SUCCESS,
  props<{ movie: Movie }>()
);

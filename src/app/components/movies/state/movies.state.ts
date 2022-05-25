import { Movie } from 'src/app/models';

export interface MoviesState {
  movies: Movie[];
}

export const initialState: MoviesState = {
  movies: [],
};
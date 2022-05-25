import { booksReducer } from '../components/books/state/books.reducer';
import { BooksState } from '../components/books/state/books.state';
import { moviesReducer } from '../components/movies/state/movies.reducer';
import { MoviesState } from '../components/movies/state/movies.state';

export interface AppState {
  books: BooksState;
  movies: MoviesState;
}

export const AppReducer = {
  books: booksReducer,
  movies: moviesReducer,
};

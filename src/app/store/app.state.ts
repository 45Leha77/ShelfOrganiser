import { authReducer } from '../components/authorization/state/authorization.reducer';
import { AuthState } from '../components/authorization/state/authorization.state';
import { booksReducer } from '../components/books/state/books.reducer';
import { BooksState } from '../components/books/state/books.state';
import { moviesReducer } from '../components/movies/state/movies.reducer';
import { MoviesState } from '../components/movies/state/movies.state';

export interface AppState {
  books: BooksState;
  movies: MoviesState;
  auth: AuthState;
}

export const AppReducer = {
  books: booksReducer,
  movies: moviesReducer,
  auth: authReducer,
};

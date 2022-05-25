import { Action, createReducer, on } from '@ngrx/store';
import { Book } from 'src/app/models';
import {
  addBookSuccess,
  deleteBookSuccess,
  editBookSuccess,
  finishReadingSuccess,
  loadBooksSuccess,
  startReadingSuccess,
} from './books.actions';
import { BooksState, initialState } from './books.state';

const _booksReducer = createReducer(
  initialState,
  on(loadBooksSuccess, (state, action) => {
    return {
      ...state,
      books: action.books,
    };
  }),
  on(deleteBookSuccess, (state, { id }) => {
    const updatedBooks = state.books.filter((book) => {
      return book.id !== id;
    });
    return {
      ...state,
      books: updatedBooks,
    };
  }),
  on(addBookSuccess, (state, action) => {
    const addedBook: Book = {
      ...action.book,
    };
    return {
      ...state,
      books: [...state.books, addedBook],
    };
  }),
  on(
    ...[editBookSuccess, startReadingSuccess, finishReadingSuccess],
    (state, action) => {
      const updatedBooks = state.books.map((book) => {
        return action.book.id === book.id ? action.book : book;
      });

      return {
        ...state,
        books: updatedBooks,
      };
    }
  )
);

export function booksReducer(state: BooksState | undefined, action: Action) {
  return _booksReducer(state, action);
}

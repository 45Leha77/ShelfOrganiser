import { createAction, props } from '@ngrx/store';
import { Book } from 'src/app/models';

export const dummyAction = createAction('[dummy action]');

export const LOAD_BOOKS = '[Books] load books';
export const LOAD_BOOKS_SUCCESS = '[Books] load books success';

export const DELETE_BOOK = '[Books] delete book';
export const DELETE_BOOK_SUCCESS = '[Books] delete book success';

export const ADD_BOOK = '[Books] add book';
export const ADD_BOOK_SUCCESS = '[Books] add book success';

export const EDIT_BOOK = '[Books] edit book';
export const EDIT_BOOK_SUCCESS = '[Books] edit book success';

export const START_READING = '[Books] start reading';
export const START_READING_SUCCESS = '[Books] start reading success';

export const FINISH_READING = '[Books] finish reading';
export const FINISH_READING_SUCCESS = '[Books] finish reading success';

export const loadBooks = createAction(LOAD_BOOKS);
export const loadBooksSuccess = createAction(
  LOAD_BOOKS_SUCCESS,
  props<{ books: Book[] }>()
);

export const deleteBook = createAction(DELETE_BOOK, props<{ id: string }>());
export const deleteBookSuccess = createAction(
  DELETE_BOOK_SUCCESS,
  props<{ id: string }>()
);

export const addBook = createAction(ADD_BOOK, props<{ book: Book }>());
export const addBookSuccess = createAction(
  ADD_BOOK_SUCCESS,
  props<{ book: Book }>()
);

export const editBook = createAction(EDIT_BOOK, props<{ book: Book }>());
export const editBookSuccess = createAction(
  EDIT_BOOK_SUCCESS,
  props<{ book: Book }>()
);

export const startReading = createAction(
  START_READING,
  props<{ book: Book }>()
);
export const startReadingSuccess = createAction(
  START_READING_SUCCESS,
  props<{ book: Book }>()
);

export const finishReading = createAction(
  FINISH_READING,
  props<{ book: Book }>()
);
export const finishReadingSuccess = createAction(
  FINISH_READING_SUCCESS,
  props<{ book: Book }>()
);
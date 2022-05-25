import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Book } from 'src/app/models';
import { BooksState } from './books.state';

export const BOOKS_STATE_NAME = 'books';
const getBooksState = createFeatureSelector<BooksState>(BOOKS_STATE_NAME);

export const getBooks = createSelector(getBooksState, (state) => {
  return state.books;
});

export const getBookById = createSelector(
  getBooksState,
  (state: any, props: any) => {
    return state.books.find((book: Book) => book.id === props.id);
  }
);
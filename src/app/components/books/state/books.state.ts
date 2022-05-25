import { Book } from 'src/app/models';

export interface BooksState {
  books: Book[];
}

export const initialState: BooksState = {
  books: [],
};
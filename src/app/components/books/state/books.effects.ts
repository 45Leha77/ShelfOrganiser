import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import {
  from,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { Book } from 'src/app/models';
import { FirebaseService } from 'src/app/services/firebase.service';
import {
  addBook,
  addBookSuccess,
  deleteBook,
  deleteBookSuccess,
  dummyAction,
  editBook,
  editBookSuccess,
  finishReading,
  finishReadingSuccess,
  loadBooks,
  loadBooksSuccess,
  startReading,
  startReadingSuccess,
} from './books.actions';
import { getBooks } from './books.selector';

@Injectable({ providedIn: 'root' })
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService,
    private router: Router,
    private store: Store,
    private notifier: NotifierService
  ) {}

  loadBooks$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(loadBooks),
      withLatestFrom(this.store.select(getBooks)),
      mergeMap(([action, books]) => {
        if (!books.length) {
          let observableData$ = from(this.firebaseService.getData('books'));
          return observableData$.pipe(
            map((books: Book[]) => {
              return loadBooksSuccess({ books });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });

  addBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addBook),
      mergeMap((action) => {
        let observableData$ = from(
          this.firebaseService.sendData('books', action.book)
        );
        return observableData$.pipe(
          map((data) => {
            this.router.navigate(['/books/book'], {
              queryParams: { id: data.id },
            });
            this.notifier.notify(
              'success',
              `Congratulations! New book entitled '${action.book.title}' was added!`
            );
            const book = { ...action.book, id: data.id };
            return addBookSuccess({ book });
          })
        );
      })
    );
  });

  deleteBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteBook),
      switchMap((action) => {
        let observableData$ = from(
          this.firebaseService.deleteData('books', action.id)
        );
        return observableData$.pipe(
          map((data) => {
            this.notifier.notify(
              'warning',
              `Book was deleted`
            );
            return deleteBookSuccess({ id: action.id });
          })
        );
      })
    );
  });

  updateBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editBook),
      switchMap((action) => {
        let observableData$ = from(
          this.firebaseService.updateData('books', action.book.id, action.book)
        );
        return observableData$.pipe(
          map((data) => {
            this.notifier.notify(
              'success',
              `${action.book.title} was succesfully edited`
            );
            return editBookSuccess({ book: action.book });
          })
        );
      })
    );
  });

  startReading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startReading),
      switchMap((action) => {
        let observableData$ = from(
          this.firebaseService.updateData('books', action.book.id, action.book)
        );
        return observableData$.pipe(
          map((data) => {
            this.notifier.notify(
              'info',
              `You just started reading the '${action.book.title}' book. Keep it up!`
            );
            return startReadingSuccess({ book: action.book });
          })
        );
      })
    );
  });

  finishReading$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(finishReading),
      switchMap((action) => {
        let observableData$ = from(
          this.firebaseService.updateData('books', action.book.id, action.book)
        );
        return observableData$.pipe(
          map((data) => {
            this.notifier.notify(
              'success',
              `You finished reading the '${action.book.title}' book. Well done!`
            );
            return finishReadingSuccess({ book: action.book });
          })
        );
      })
    );
  });

  // bookRedirect$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(...[deleteBookSuccess, addBookSuccess]),
  //       tap(() => {
  //         this.router.navigate(['/books']);
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NotifierService } from 'angular-notifier';
import { from, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import { Movie } from 'src/app/models';
import { FirebaseService } from 'src/app/services/firebase.service';
import {
  addMovie,
  addMovieSuccess,
  deleteMovie,
  deleteMovieSuccess,
  dummyAction,
  editMovie,
  editMovieSuccess,
  finishWatching,
  finishWatchingSuccess,
  loadMovies,
  loadMoviesSuccess,
  startWatching,
  startWatchingSuccess,
} from './movies.actions';
import { getMovies } from './movies.selector';

@Injectable({ providedIn: 'root' })
export class MoviesEffects {
  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService,
    private router: Router,
    private store: Store,
    private notifier: NotifierService
  ) {}

  loadMovies$ = createEffect((): any => {
    return this.actions$.pipe(
      ofType(loadMovies),
      withLatestFrom(this.store.select(getMovies)),
      mergeMap(([action, movies]) => {
        if (!movies.length) {
          let observableData$ = from(this.firebaseService.getData('films'));
          return observableData$.pipe(
            map((movies: Movie[]) => {
              return loadMoviesSuccess({ movies });
            })
          );
        }
        return of(dummyAction());
      })
    );
  });

  addMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addMovie),
      mergeMap((action) => {
        let observableData$ = from(
          this.firebaseService.sendData('films', action.movie)
        );
        return observableData$.pipe(
          map((data) => {
            this.router.navigate(['/movies/movie'], {
              queryParams: { id: data.id },
            });
            this.notifier.notify(
              'success',
              `Congratulations! New movie entitled '${action.movie.title}' was added!`
            );
            const movie = { ...action.movie, id: data.id };
            return addMovieSuccess({ movie });
          })
        );
      })
    );
  });

  deleteMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteMovie),
      switchMap((action) => {
        let observableData$ = from(
          this.firebaseService.deleteData('films', action.id)
        );
        return observableData$.pipe(
          map((data) => {
            this.notifier.notify('warning', `Film was deleted`);
            return deleteMovieSuccess({ id: action.id });
          })
        );
      })
    );
  });

  updateMovie$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(editMovie),
      switchMap((action) => {
        let observableData$ = from(
          this.firebaseService.updateData(
            'films',
            action.movie.id,
            action.movie
          )
        );
        return observableData$.pipe(
          map((data) => {
            this.notifier.notify(
              'success',
              `${action.movie.title} was succesfully edited`
            );
            return editMovieSuccess({ movie: action.movie });
          })
        );
      })
    );
  });

  startWatching$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(startWatching),
      switchMap((action) => {
        let observableData$ = from(
          this.firebaseService.updateData(
            'films',
            action.movie.id,
            action.movie
          )
        );
        return observableData$.pipe(
          map((data) => {
            this.notifier.notify(
              'info',
              `You just started watching the '${action.movie.title}' movie. Keep it up!`
            );
            return startWatchingSuccess({ movie: action.movie });
          })
        );
      })
    );
  });

  finishWatching$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(finishWatching),
      switchMap((action) => {
        let observableData$ = from(
          this.firebaseService.updateData(
            'films',
            action.movie.id,
            action.movie
          )
        );
        return observableData$.pipe(
          map((data) => {
            this.notifier.notify(
              'success',
              `You finished watching the '${action.movie.title}' movie. Well done!`
            );
            return finishWatchingSuccess({ movie: action.movie });
          })
        );
      })
    );
  });

  // movieRedirect$ = createEffect(
  //   () => {
  //     return this.actions$.pipe(
  //       ofType(...[deleteMovieSuccess, addMovieSuccess]),
  //       tap(() => {
  //         this.router.navigate(['/films']);
  //       })
  //     );
  //   },
  //   { dispatch: false }
  // );
}

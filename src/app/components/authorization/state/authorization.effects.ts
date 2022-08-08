import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
// import { NotifierService } from 'angular-notifier';
import { User, UserCredential } from 'firebase/auth';
import { from, map, exhaustMap, catchError, of, mergeMap, tap } from 'rxjs';
import { FirebaseService } from 'src/app/services/firebase.service';
import { AppState } from 'src/app/store/app.state';
import {
  authAuto,
  authStart,
  authSuccess,
  logout,
  setErrorMessage,
} from './authorization.actions';

@Injectable({ providedIn: 'root' })
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private firebaseService: FirebaseService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authStart),
      exhaustMap((action) => {
        let observableData$ = from(
          this.firebaseService.logIn(action.user.email, action.user.password)
        );
        return observableData$.pipe(
          map((data: UserCredential) => {
            if (data.user) {
              this.firebaseService.setUserInLocalStorage(data.user);
              return authSuccess({ user: data.user, redirect: true });
            }
            return of();
          }),
          catchError((errResp) => {
            const message = this.firebaseService.getAuthError(errResp.code);
            this.store.dispatch(
              setErrorMessage({
                message,
              })
            );
            return of(errResp);
          })
        );
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(logout),
        map((action) => {
          this.firebaseService.logOut();
          this.router.navigate(['/']);
          localStorage.removeItem('user');
        })
      );
    },
    { dispatch: false }
  );

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(authAuto),
      mergeMap((action) => {
        const user: User | null =
          this.firebaseService.getUserFromLocalStorage()!;
        return of(authSuccess({ user, redirect: false }));
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authSuccess),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/books']);
          }
        })
      );
    },
    { dispatch: false }
  );
}

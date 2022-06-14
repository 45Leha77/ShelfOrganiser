import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { isAuthenticated } from '../components/authorization/state/authorization.selector';
import { AppState } from '../store/app.state';
// import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    // private firebaseService: FirebaseService,
    private router: Router,
    private store: Store<AppState>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // return this.firebaseService.isAuth().then((isLoggedIn: boolean) => {
    //   if (isLoggedIn) {
    //     return true;
    //   } else {
    //     console.log('User has to be authorized')
    //     this.router.navigate(['/']);
    //     return false;
    //   }
    // });

    return this.store.select(isAuthenticated).pipe(
      map((auth: boolean) => {
        if (!auth) {
          console.error('User has to be authorized');
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}

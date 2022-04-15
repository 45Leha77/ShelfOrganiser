import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from './firebase.service';

@Injectable() // чтобы добавлять в одни сервисы другие сервисы;
export class AuthGuard implements CanActivate {
  constructor(private firebaseService: FirebaseService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.firebaseService.isAuth().then((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        return true;
      } else {
        console.log('User has to be authorized')
        return false;
      }
    });
  }
}
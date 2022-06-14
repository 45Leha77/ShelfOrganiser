import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { authAuto } from './components/authorization/state/authorization.actions';
import { isAuthenticated } from './components/authorization/state/authorization.selector';
import { AppState } from './store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isAuthenticated: Observable<boolean> = of(false);
  constructor(private store: Store<AppState>) {
    this.store.dispatch(authAuto());
  }
  ngOnInit(): void {
    this.isAuthenticated = this.store.select(isAuthenticated);
  }
}

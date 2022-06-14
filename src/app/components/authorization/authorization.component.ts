import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { authStart } from './state/authorization.actions';
import { getErrorMessage } from './state/authorization.selector';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  constructor(private router: Router, private store: Store<AppState>) {}
  authForm!: FormGroup;
  authError!: Observable<string>;

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
    if (localStorage.getItem('user')) {
      this.router.navigate(['/books']);
    }
    this.authError = this.store.select(getErrorMessage);
  }

  onSubmit() {
    const user = {
      email: this.authForm.value.email,
      password: this.authForm.value.password,
    };
    this.store.dispatch(authStart({ user }));
  }
}

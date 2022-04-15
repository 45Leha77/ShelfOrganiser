import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
})
export class AuthorizationComponent implements OnInit {
  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private appComponent: AppComponent
  ) {}
  authForm!: FormGroup;
  authError: string = '';

  ngOnInit(): void {
    this.authForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    this.firebaseService
      .logIn(this.authForm.value.email, this.authForm.value.password)
      .then(() => {
        this.authForm.reset();
        this.router.navigate(['/books']);
        this.appComponent.isLoggedIn = true;
      })
      .catch((err) => {
        if (err.code === 'auth/user-not-found') {
          this.authError = 'Email does not exist';
        }
        if (err.code === 'auth/wrong-password') {
          this.authError = 'Wrong password';
        }
      });
  }
}

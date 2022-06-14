import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotifierModule } from 'angular-notifier';
import { AuthorizationComponent } from './authorization.component';
import { AuthEffects } from './state/authorization.effects';
import { authReducer } from './state/authorization.reducer';
import { USER_STATE_NAME } from './state/authorization.selector';

@NgModule({
  declarations: [AuthorizationComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forFeature(USER_STATE_NAME, authReducer),
    EffectsModule.forFeature([AuthEffects]),
    NotifierModule,
  ],
})
export class AuthorizationModule {}

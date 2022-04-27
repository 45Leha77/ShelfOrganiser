import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthorizationComponent } from './authorization.component';

@NgModule({
  declarations: [AuthorizationComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [AuthorizationComponent],
})
export class AuthorizationModule {}

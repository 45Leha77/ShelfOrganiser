import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifierModule } from 'angular-notifier';
import { AddFormRoutingModule } from './add-form-routing.module';
import { AddFormComponent } from './add-form.component';

@NgModule({
  declarations: [AddFormComponent],
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    NotifierModule,
    CommonModule,
    AddFormRoutingModule,
  ],
  exports: [AddFormComponent],
})
export class AddFormModule {}

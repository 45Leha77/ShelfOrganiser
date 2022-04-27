import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifierModule } from 'angular-notifier';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalWindowModule } from '../modal-window/modal-window.module';
import { BookComponent } from './book/book.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';

@NgModule({
  declarations: [BooksComponent, BookComponent],
  imports: [
    CommonModule,
    NotifierModule,
    RouterModule,
    FontAwesomeModule,
    BooksRoutingModule,
    ModalWindowModule,
    SharedModule,
  ],
  exports: [BooksComponent, BookComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BooksModule {}
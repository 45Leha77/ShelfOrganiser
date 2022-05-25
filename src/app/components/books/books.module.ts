import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotifierModule } from 'angular-notifier';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalWindowModule } from '../modal-window/modal-window.module';
import { BookComponent } from './book/book.component';
import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { BooksEffects } from './state/books.effects';
import { booksReducer } from './state/books.reducer';
import { BOOKS_STATE_NAME } from './state/books.selector';

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
    StoreModule.forFeature(BOOKS_STATE_NAME,booksReducer),
    EffectsModule.forFeature([BooksEffects]),
  ],
  exports: [BooksComponent, BookComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BooksModule {}
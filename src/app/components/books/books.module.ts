import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
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
import { EditBookFormComponent } from './edit-book-form/edit-book-form.component';

@NgModule({
  declarations: [BooksComponent, BookComponent, EditBookFormComponent],
  imports: [
    CommonModule,
    NotifierModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BooksRoutingModule,
    ModalWindowModule,
    SharedModule,
    StoreModule.forFeature(BOOKS_STATE_NAME, booksReducer),
    EffectsModule.forFeature([BooksEffects]),
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class BooksModule {}

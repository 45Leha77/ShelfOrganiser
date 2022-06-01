import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotifierModule } from 'angular-notifier';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalWindowModule } from '../modal-window/modal-window.module';
import { EditMovieFormComponent } from './edit-movie-form/edit-movie-form.component';
import { MovieComponent } from './movie/movie.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MoviesEffects } from './state/movies.effects';
import { moviesReducer } from './state/movies.reducer';
import { MOVIES_STATE_NAME } from './state/movies.selector';

@NgModule({
  declarations: [MoviesComponent, MovieComponent, EditMovieFormComponent],
  imports: [
    CommonModule,
    NotifierModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MoviesRoutingModule,
    ModalWindowModule,
    SharedModule,
    StoreModule.forFeature(MOVIES_STATE_NAME, moviesReducer),
    EffectsModule.forFeature([MoviesEffects]),
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [MoviesComponent, MovieComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MoviesModule {}

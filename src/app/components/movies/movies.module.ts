import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NotifierModule } from 'angular-notifier';
import { SafePipe } from 'src/app/shared/safe.pipe';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalWindowModule } from '../modal-window/modal-window.module';
import { MovieComponent } from './movie/movie.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';
import { MoviesEffects } from './state/movies.effects';
import { moviesReducer } from './state/movies.reducer';
import { MOVIES_STATE_NAME } from './state/movies.selector';

@NgModule({
  declarations: [MoviesComponent, MovieComponent],
  imports: [
    CommonModule,
    NotifierModule,
    RouterModule,
    FontAwesomeModule,
    MoviesRoutingModule,
    ModalWindowModule,
    SharedModule,
    StoreModule.forFeature(MOVIES_STATE_NAME, moviesReducer),
    EffectsModule.forFeature([MoviesEffects]),
  ],
  exports: [MoviesComponent, MovieComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MoviesModule {}

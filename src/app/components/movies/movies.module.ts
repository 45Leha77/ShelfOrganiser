import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotifierModule } from 'angular-notifier';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalWindowModule } from '../modal-window/modal-window.module';
import { MovieComponent } from './movie/movie.component';
import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './movies.component';

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
  ],
  exports: [MoviesComponent, MovieComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MoviesModule {}

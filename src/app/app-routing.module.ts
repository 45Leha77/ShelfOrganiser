import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddFormComponent } from './components/add-form/add-form.component';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { BookComponent } from './components/books/book/book.component';
import { BooksComponent } from './components/books/books.component';
import { MovieComponent } from './components/movies/movie/movie.component';
import { MoviesComponent } from './components/movies/movies.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: AuthorizationComponent },
  { path: 'add', component: AddFormComponent, canActivate: [AuthGuard] },
  { path: 'movies', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'books', component: BooksComponent, canActivate: [AuthGuard] },
  { path: 'books/book', component: BookComponent, canActivate: [AuthGuard] },
  { path: 'movies/movie', component: MovieComponent, canActivate: [AuthGuard] },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

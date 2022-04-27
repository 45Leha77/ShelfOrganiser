import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationComponent } from './components/authorization/authorization.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', component: AuthorizationComponent },
  {
    path: 'add',
    loadChildren: () =>
      import('./components/add-form/add-form.module').then(
        ({ AddFormModule }) => AddFormModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./components/movies/movies.module').then(
        ({ MoviesModule }) => MoviesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'books',
    loadChildren: () =>
      import('./components/books/books.module').then(
        ({ BooksModule }) => BooksModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'books/book',
    loadChildren: () =>
      import('./components/books/books.module').then(
        ({ BooksModule }) => BooksModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'movies/movie',
    loadChildren: () =>
      import('./components/movies/movies.module').then(
        ({ MoviesModule }) => MoviesModule
      ),
    canActivate: [AuthGuard],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

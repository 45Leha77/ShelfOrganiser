import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { BookComponent } from './book/book.component';
import { BooksComponent } from './books.component';

const booksRoutes: Routes = [
  { path: '', component: BooksComponent, canActivate: [AuthGuard] },
  {
    path: 'book',
    component: BookComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(booksRoutes)],
  exports: [RouterModule],
})
export class BooksRoutingModule {}

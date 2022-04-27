import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/services/auth-guard.service";
import { MovieComponent } from "./movie/movie.component";
import { MoviesComponent } from "./movies.component";


const moviesRoutes: Routes = [
  { path: '', component: MoviesComponent, canActivate: [AuthGuard] },
  { path: 'movie', component: MovieComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(moviesRoutes)],
  exports: [RouterModule],
})
export class MoviesRoutingModule {}
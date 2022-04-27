import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/services/auth-guard.service';
import { AddFormComponent } from './add-form.component';

const addFormRoutes: Routes = [
  { path: '', component: AddFormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(addFormRoutes)],
  exports: [RouterModule],
})
export class AddFormRoutingModule {}

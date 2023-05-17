import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFountComponent } from './not-fount.component';

const routes: Routes = [{ path: '', component: NotFountComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotFountRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RegistrationGuard } from './registration.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RegistrationComponent,
    canActivate: [RegistrationGuard],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class RegistrationRoutingModule {}

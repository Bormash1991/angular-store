import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    children: [
      { path: '', redirectTo: 'users', pathMatch: 'full' },
      {
        path: 'users',
        loadChildren: () =>
          import('src/app/users/users-routing.module').then(
            (m) => m.UsersRoutingModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('src/app/products/products-routing.module').then(
            (m) => m.ProductsRoutingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPanelRoutingModule {}

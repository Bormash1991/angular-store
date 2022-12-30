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
          import('src/app/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('src/app/products/products.module').then(
            (m) => m.ProductsModule
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
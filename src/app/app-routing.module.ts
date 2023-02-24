import { AuthGuard } from './shared/services/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'admin-panel',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./admin-panel/admin-panel.module').then(
        (m) => m.AdminPanelModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationModule
      ),
  },
  {
    path: '',
    loadChildren: () => import('./shop/shop.module').then((m) => m.ShopModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./errors/errors.module').then((m) => m.ErrorsModule),
  },
  {
    path: 'products-details',
    loadChildren: () =>
      import('./shop/products-details/products-details.module').then(
        (m) => m.ProductsDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

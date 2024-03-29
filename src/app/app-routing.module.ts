import { AuthGuard } from './shared/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  {
    path: 'admin-panel',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./admin-panel/admin-panel.module').then(
        (m) => m.AdminPanelModule
      ),
  },
  {
    path: 'login',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'registration',
    canActivate: [AuthGuard],
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
    path: 'not-fount',
    loadChildren: () =>
      import('./not-fount/not-fount.module').then((m) => m.NotFountModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

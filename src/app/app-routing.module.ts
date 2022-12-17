import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'admin-panel',
    loadChildren: () =>
      import('./admin-panel/admin-panel-routing.module').then(
        (m) => m.AdminPanelRoutingModule
      ),
  },
  {
    path: '',
    loadChildren: () =>
      import('./shop/shop-routing.module').then((m) => m.ShopRoutingModule),
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

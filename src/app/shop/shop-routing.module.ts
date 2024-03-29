import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import { ShopComponent } from './shop.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { CabinetGuard } from './shared/guards/cabinet.guard';
const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: '',
        component: WelcomePageComponent,
      },
      {
        path: '404',
        loadChildren: () =>
          import('../not-fount/not-fount.module').then((m) => m.NotFountModule),
      },
      {
        path: 'cabinet',
        canActivate: [CabinetGuard],
        loadChildren: () =>
          import('./cabinet/cabinet.module').then((m) => m.CabinetModule),
      },
      {
        path: ':id',
        component: ProductListComponent,
      },

      {
        path: ':id/:id',
        loadChildren: () =>
          import('./products-details/products-details.module').then(
            (m) => m.ProductsDetailsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ShopRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PageNotFoundComponent } from '../errors/page-not-found/page-not-found.component';
import { ShopComponent } from './shop.component';
import { CartComponent } from './cart/cart.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
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
        path: 'products',

        component: ProductListComponent,
      },
      {
        path: 'products/cart',

        component: CartComponent,
      },
      {
        path: 'products/:id',
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
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
        pathMatch: 'full',
        component: WelcomePageComponent,
      },
      {
        path: 'products',
        pathMatch: 'full',
        component: ProductListComponent,
      },
      {
        path: 'products/cart',
        pathMatch: 'full',
        component: CartComponent,
      },
      {
        path: 'products/:id',
        pathMatch: 'full',
        component: ProductsDetailsComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: '404-not-found',
      },
      {
        path: '404-not-found',
        pathMatch: 'full',
        component: PageNotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ShopRoutingModule {}

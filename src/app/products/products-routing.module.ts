import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';
import { ProductsComponent } from './products.component';
import { CartComponent } from './cart/cart.component';
const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ProductListComponent,
      },
      {
        path: 'cart',
        pathMatch: 'full',
        component: CartComponent,
      },
      {
        path: '404-not-found',
        pathMatch: 'full',
        component: PageNotFoundComponent,
      },
      {
        path: ':id',
        pathMatch: 'full',
        component: ProductsDetailsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProductsRoutingModule {}

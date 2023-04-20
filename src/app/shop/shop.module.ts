import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { CartComponent } from './cart/cart.component';
import { CounterComponent } from './shared/counter/counter.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ShopRoutingModule } from './shop-routing.module';
import { TotalBtnComponent } from './shared/total-btn/total-btn.component';
import { OrderModalComponent } from './shared/order-modal/order-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThanksModalComponent } from './shared/thanks-modal/thanks-modal.component';
import { ProductsDetailsModule } from './products-details/products-details.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ShopComponent,
    HeaderComponent,
    FooterComponent,
    ProductListComponent,
    CartModalComponent,
    CartComponent,
    CounterComponent,
    WelcomePageComponent,
    TotalBtnComponent,
    OrderModalComponent,
    ThanksModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ProductsDetailsModule,
    MaterialModule,
  ],
})
export class ShopModule {}

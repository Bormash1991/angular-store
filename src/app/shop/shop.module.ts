import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { CartComponent } from './cart/cart.component';
import { CounterComponent } from './counter/counter.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
@NgModule({
  declarations: [
    ShopComponent,
    HeaderComponent,
    FooterComponent,
    ProductsDetailsComponent,
    ProductListComponent,
    CartModalComponent,
    CartComponent,
    CounterComponent,
    WelcomePageComponent,
  ],
  imports: [CommonModule, SharedModule, RouterModule],
})
export class ShopModule {}

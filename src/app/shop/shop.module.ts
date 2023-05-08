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
import { CounterComponent } from './shared/components/counter/counter.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ShopRoutingModule } from './shop-routing.module';
import { TotalBtnComponent } from './shared/components/total-btn/total-btn.component';
import { OrderModalComponent } from './shared/components/order-modal/order-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThanksModalComponent } from './shared/components/thanks-modal/thanks-modal.component';
import { ProductsDetailsModule } from './products-details/products-details.module';
import { MaterialModule } from '../material/material.module';
import { SideBarComponent } from './side-bar/side-bar.component';
import { ProductQuantityComponent } from './shared/components/product-quantity/product-quantity.component';
import { CatalogueComponent } from './catalogue/catalogue.component';

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
    SideBarComponent,
    ProductQuantityComponent,
    CatalogueComponent,
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
  exports: [CounterComponent]
})
export class ShopModule {}

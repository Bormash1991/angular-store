import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopComponent } from './shop.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsDetailsComponent } from './products-details/products-details.component';
import { RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';
import { CartComponent } from './cart/cart.component';
import { CounterComponent } from './shared/counter/counter.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { ShopRoutingModule } from './shop-routing.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TotalBtnComponent } from './shared/total-btn/total-btn.component';
import { OrderModalComponent } from './shared/order-modal/order-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ThanksModalComponent } from './shared/thanks-modal/thanks-modal.component';
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
    TotalBtnComponent,
    OrderModalComponent,
    ThanksModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ShopRoutingModule,
    RouterModule,
    MatPaginatorModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
  ],
})
export class ShopModule {}

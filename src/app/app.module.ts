import { AdminPanelRoutingModule } from './admin-panel/admin-panel-routing.module';
import { AdminPanelModule } from './admin-panel/admin-panel.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShopRoutingModule } from './shop/shop-routing.module';
import { SharedModule } from './shared/shared.module';
import { ShopModule } from './shop/shop.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ShopRoutingModule,
    AdminPanelRoutingModule,
    SharedModule,
    ShopModule,
    AdminPanelModule,
    BrowserAnimationsModule,
    UsersModule,
    ProductsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

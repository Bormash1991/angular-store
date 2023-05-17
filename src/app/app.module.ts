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
import { ProductsModule } from './admin-panel/products/products.module';
import { HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { ErrorsModule } from './errors/errors.module';
import { OrdersModule } from './admin-panel/orders/orders.module';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';

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
    ProductsModule,
    HttpClientModule,
    LoginModule,
    ErrorsModule,
    OrdersModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

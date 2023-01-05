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
import { UsersModule } from './admin-panel/users/users.module';
import { ProductsModule } from './admin-panel/products/products.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginModule } from './login/login.module';
import { AuthInterceptor } from './shared/services/auth-interceptor.interceptor';
import { ErrorsModule } from './errors/errors.module';
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
    HttpClientModule,
    LoginModule,
    ErrorsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductsRoutingModule } from './products/products-routing.module';
import { ProductsComponent } from './products/products.component';
import { ProductItemComponent } from './product-item/product-item.component';
import { UahPipe } from './uah.pipe';
import { PriceHighlightDirective } from './price-highlight.directive';
import { AddButtonComponent } from './add-button/add-button.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    ProductsComponent,
    ProductItemComponent,
    UahPipe,
    PriceHighlightDirective,
    AddButtonComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ProductsRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@NgModule({
  declarations: [ProductsComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, SharedModule],
})
export class ProductsModule {}

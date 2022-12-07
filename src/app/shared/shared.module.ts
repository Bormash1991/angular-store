import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UahPipe } from '../uah.pipe';
import { PriceHighlightDirective } from '../price-highlight.directive';
import { ProductItemComponent } from '../product-item/product-item.component';
import { AddButtonComponent } from '../add-button/add-button.component';
@NgModule({
  declarations: [
    UahPipe,
    PriceHighlightDirective,
    ProductItemComponent,
    AddButtonComponent,
  ],
  imports: [CommonModule],
  exports: [
    UahPipe,
    PriceHighlightDirective,
    ProductItemComponent,
    AddButtonComponent,
  ],
})
export class SharedModule {}

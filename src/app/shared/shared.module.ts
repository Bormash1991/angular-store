import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UahPipe } from './pipes/uah.pipe';
import { PriceHighlightDirective } from './directives/price-highlight.directive';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { AddButtonComponent } from './components/add-button/add-button.component';
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

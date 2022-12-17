import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UahPipe } from './pipes/uah.pipe';
import { PriceHighlightDirective } from './directives/price-highlight.directive';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { BtnComponent } from './components/btn/btn.component';
import { RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TablesComponent } from './components/tables/tables.component';
@NgModule({
  declarations: [
    UahPipe,
    PriceHighlightDirective,
    ProductItemComponent,
    BtnComponent,
    PageNotFoundComponent,
    TablesComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    UahPipe,
    PriceHighlightDirective,
    ProductItemComponent,
    BtnComponent,
    TablesComponent,
  ],
})
export class SharedModule {}

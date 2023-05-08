import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UahPipe } from './pipes/uah.pipe';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { BtnComponent } from './components/btn/btn.component';
import { RouterModule } from '@angular/router';
import { TablesComponent } from './components/tables/tables.component';
import { FilterComponent } from './components/filter/filter.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UsersTablesComponent } from './components/users-tables/users-tables.component';
import { OrderTableComponent } from './components/order-table/order-table.component';
import { StarRatingModule } from 'angular-star-rating';
import { RatingComponent } from './components/rating/rating.component';
import { MaterialModule } from '../material/material.module';
import { CloseCatalogueDirective } from './directives/close-catalogue.directive';
@NgModule({
  declarations: [
    UahPipe,
    ProductItemComponent,
    BtnComponent,
    TablesComponent,
    FilterComponent,
    SpinnerComponent,
    UsersTablesComponent,
    OrderTableComponent,
    RatingComponent,
    CloseCatalogueDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    StarRatingModule.forRoot(),
    MaterialModule,
  ],
  exports: [
    UahPipe,
    ProductItemComponent,
    BtnComponent,
    TablesComponent,
    FilterComponent,
    SpinnerComponent,
    UsersTablesComponent,
    OrderTableComponent,
    RatingComponent,
    CloseCatalogueDirective,
  ],
})
export class SharedModule {}

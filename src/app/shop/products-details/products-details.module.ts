import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsDetailsRoutingModule } from './products-details-routing.module';
import { ProductsDetailsComponent } from './products-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutComponent } from './about/about.component';
import { CharacteristicsComponent } from './characteristics/characteristics.component';
import { CommentsComponent } from './comments/comments.component';

@NgModule({
  declarations: [
    ProductsDetailsComponent,
    AboutComponent,
    CharacteristicsComponent,
    CommentsComponent,
  ],
  imports: [CommonModule, ProductsDetailsRoutingModule, SharedModule],
})
export class ProductsDetailsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsDetailsRoutingModule } from './products-details-routing.module';
import { ProductsDetailsComponent } from './products-details.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AboutComponent } from './about/about.component';
import { CharacteristicsComponent } from './characteristics/characteristics.component';
import { CommentsComponent } from './comments/comments.component';
import { MaterialModule } from 'src/app/material/material.module';
import { AddCommentModalComponent } from './add-comment-modal/add-comment-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';
import { ShopModule } from '../shop.module';
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    ProductsDetailsComponent,
    AboutComponent,
    CharacteristicsComponent,
    CommentsComponent,
    AddCommentModalComponent,
  ],
  imports: [
    CommonModule,
    ProductsDetailsRoutingModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot(),
    QuillModule.forRoot(),
  ],
})
export class ProductsDetailsModule {}

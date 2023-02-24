import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsDetailsComponent } from './products-details.component';
import { AboutComponent } from './about/about.component';
import { CharacteristicsComponent } from './characteristics/characteristics.component';
import { DetailsGuard } from './details.guard';
import { CommentsComponent } from './comments/comments.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [DetailsGuard],
    component: ProductsDetailsComponent,
    children: [
      {
        path: '',

        component: AboutComponent,
      },
      {
        path: 'characteristics',
        component: CharacteristicsComponent,
      },
      {
        path: 'comments',
        component: CommentsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsDetailsRoutingModule {}

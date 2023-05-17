import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFountRoutingModule } from './not-fount-routing.module';
import { NotFountComponent } from './not-fount.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [NotFountComponent],
  imports: [CommonModule, NotFountRoutingModule, SharedModule],
})
export class NotFountModule {}

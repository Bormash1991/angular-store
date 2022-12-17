import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { UsersComponent } from './users/users.component';
import { FilterComponent } from './filter/filter.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminPanelComponent,
    SideBarComponent,
    UsersComponent,
    FilterComponent,
    ProductsComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
  ],
})
export class AdminPanelModule {}

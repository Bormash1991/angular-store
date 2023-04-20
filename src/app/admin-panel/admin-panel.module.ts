import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SharedModule } from '../shared/shared.module';
import { WarningModalComponent } from './warning-modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersModalComponent } from './users-modal/users-modal.component';
import { ProductsModalComponent } from './products-modal/products-modal.component';
import { OrdersModalComponent } from './orders-modal/orders-modal.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    AdminPanelComponent,
    SideBarComponent,
    WarningModalComponent,
    UsersModalComponent,
    ProductsModalComponent,
    OrdersModalComponent,
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class AdminPanelModule {}

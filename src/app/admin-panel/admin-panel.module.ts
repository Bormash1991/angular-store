import { MatSelectModule } from '@angular/material/select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdminPanelComponent,
    SideBarComponent,

  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    SharedModule,
  ],
})
export class AdminPanelModule {}

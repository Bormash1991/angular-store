import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabinetRoutingModule } from './cabinet-routing.module';
import { CabinetComponent } from './cabinet.component';
import { SideBarComponent } from './side-bar/side-bar.component';


@NgModule({
  declarations: [
    CabinetComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    CabinetRoutingModule
  ]
})
export class CabinetModule { }

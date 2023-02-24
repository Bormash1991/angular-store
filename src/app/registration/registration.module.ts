import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RegistrationRoutingModule } from './registration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    RegistrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
  ],
})
export class RegistrationModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CabinetComponent } from './cabinet.component';

const routes: Routes = [
  {
    path: '',
    component: CabinetComponent,
    children: [
      {
        path: '',
        redirectTo: 'personal-information',
        pathMatch: 'full',
      },
      {
        path: 'personal-information',
        loadChildren: () =>
          import('./personal-information/personal-information.module').then(
            (m) => m.PersonalInformationModule
          ),
      },
      {
        path: 'orders',
        loadChildren: () =>
          import('./orders/orders.module').then((m) => m.OrdersModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CabinetRoutingModule {}

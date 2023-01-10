import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnautorizedPageComponent } from './unautorized-page/unautorized-page.component';
import { ErrorsComponent } from './errors.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';

const routes: Routes = [
  {
    path: '',
    component: ErrorsComponent,
    children: [
      {
        path: '404',
        component: PageNotFoundComponent,
      },
      {
        path: '401',
        component: UnautorizedPageComponent,
      },
      {
        path: '403',
        component: ForbiddenPageComponent,
      },
      {
        path: '**',
        redirectTo: '404',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ErrorsRoutingModule {}

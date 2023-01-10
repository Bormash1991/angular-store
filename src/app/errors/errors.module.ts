import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorsRoutingModule } from './errors-routing.module';
import { UnautorizedPageComponent } from './unautorized-page/unautorized-page.component';
import { ErrorsComponent } from './errors.component';
import { RouterModule } from '@angular/router';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { SharedModule } from '../shared/shared.module';
import { StartLinkComponent } from './shared/start-link/start-link.component';
import { PageComponent } from './shared/page/page.component';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    UnautorizedPageComponent,
    ErrorsComponent,
    ForbiddenPageComponent,
    StartLinkComponent,
    PageComponent,
  ],
  imports: [CommonModule, ErrorsRoutingModule, RouterModule, SharedModule],
  exports: [PageNotFoundComponent],
})
export class ErrorsModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AudoTestingPage } from './audo-testing.page';

const routes: Routes = [
  {
    path: '',
    component: AudoTestingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AudoTestingPageRoutingModule {}

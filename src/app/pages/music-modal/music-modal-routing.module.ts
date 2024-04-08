import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MusicModalPage } from './music-modal.page';

const routes: Routes = [
  {
    path: '',
    component: MusicModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicModalPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StickerModalPage } from './sticker-modal.page';

const routes: Routes = [
  {
    path: '',
    component: StickerModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StickerModalPageRoutingModule {}

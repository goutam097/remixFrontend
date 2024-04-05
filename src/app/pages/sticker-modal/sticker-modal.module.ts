import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StickerModalPageRoutingModule } from './sticker-modal-routing.module';

import { StickerModalPage } from './sticker-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StickerModalPageRoutingModule
  ],
  declarations: [StickerModalPage]
})
export class StickerModalPageModule {}

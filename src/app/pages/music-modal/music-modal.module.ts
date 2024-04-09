import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MusicModalPageRoutingModule } from './music-modal-routing.module';

import { MusicModalPage } from './music-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MusicModalPageRoutingModule
  ],
  declarations: [MusicModalPage]
})
export class MusicModalPageModule {}

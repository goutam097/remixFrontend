import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TextModalPageRoutingModule } from './text-modal-routing.module';

import { TextModalPage } from './text-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TextModalPageRoutingModule
  ],
  declarations: [TextModalPage]
})
export class TextModalPageModule {}

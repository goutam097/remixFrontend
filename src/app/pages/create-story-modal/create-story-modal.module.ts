import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateStoryModalPageRoutingModule } from './create-story-modal-routing.module';

import { CreateStoryModalPage } from './create-story-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateStoryModalPageRoutingModule
  ],
  declarations: [CreateStoryModalPage]
})
export class CreateStoryModalPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AudoTestingPageRoutingModule } from './audo-testing-routing.module';

import { AudoTestingPage } from './audo-testing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AudoTestingPageRoutingModule
  ],
  declarations: [AudoTestingPage]
})
export class AudoTestingPageModule {}

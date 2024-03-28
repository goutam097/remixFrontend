import { Component } from '@angular/core';
import { CreateStoryModalPage } from '../pages/create-story-modal/create-story-modal.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private modalCtrl : ModalController
  ) {}

  async openModal(){
    const modal = await this.modalCtrl.create({
      component: CreateStoryModalPage,
      
    });
    return await modal.present()
  }

}

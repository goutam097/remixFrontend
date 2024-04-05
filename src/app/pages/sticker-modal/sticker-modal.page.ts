import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-sticker-modal',
  templateUrl: './sticker-modal.page.html',
  styleUrls: ['./sticker-modal.page.scss'],
})
export class StickerModalPage implements OnInit {

  constructor(private modalCtrl: ModalController) {}

  async opeStickernModal(){
    const modal = await this.modalCtrl.create({
      component: StickerModalPage,
      
    });
    return await modal.present()
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
   
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-music-modal',
  templateUrl: './music-modal.page.html',
  styleUrls: ['./music-modal.page.scss'],
})
export class MusicModalPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  async openMusicnModal(){
    const modal = await this.modalCtrl.create({
      component: MusicModalPage,
      
    });
    return await modal.present()
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
   
  }

  ngOnInit() {
  }

}

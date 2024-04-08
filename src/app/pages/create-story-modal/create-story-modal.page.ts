import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StickerModalPage } from '../sticker-modal/sticker-modal.page';
import { TextModalPage } from '../text-modal/text-modal.page';
import { MusicModalPage } from '../music-modal/music-modal.page';

@Component({
  selector: 'app-create-story-modal',
  templateUrl: './create-story-modal.page.html',
  styleUrls: ['./create-story-modal.page.scss'],
})
export class CreateStoryModalPage implements OnInit {

  isModalOpen = false;
  showColorDiv: boolean = false;
  showTextDiv: boolean =false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private modalCtrl: ModalController) {}

  async opeStickernModal(){
    const modal = await this.modalCtrl.create({
      component: StickerModalPage,
      
    });
    return await modal.present()
  }

  async openTextModal(){
    const modal = await this.modalCtrl.create({
      component: TextModalPage,
      
    });
    return await modal.present()
  }

  async openMusicModal(){
    const modal = await this.modalCtrl.create({
      component: MusicModalPage,
      
    });
    return await modal.present()
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
   
  }


  showColor() {
    this.showColorDiv = !this.showColorDiv;
    this.showTextDiv = false;
  }

  showText(){
    this.showTextDiv = !this.showTextDiv;
    this.showColorDiv = false;
  }
  

  ngOnInit() {
  }

}

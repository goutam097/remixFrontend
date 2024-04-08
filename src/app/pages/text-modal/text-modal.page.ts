import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.page.html',
  styleUrls: ['./text-modal.page.scss'],
})
export class TextModalPage implements OnInit {



  isModalOpen = false;
  showColorDiv: boolean = false;
  showTextDiv: boolean =false;

  constructor(private modalCtrl: ModalController) {}

  async openTextModal(){
    const modal = await this.modalCtrl.create({
      component: TextModalPage,
      
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
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-story-modal',
  templateUrl: './create-story-modal.page.html',
  styleUrls: ['./create-story-modal.page.scss'],
})
export class CreateStoryModalPage implements OnInit {

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(private modalCtrl: ModalController) {}

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
   
  }

  

  ngOnInit() {
  }

}

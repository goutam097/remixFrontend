import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.page.html',
  styleUrls: ['./text-modal.page.scss'],
})
export class TextModalPage implements OnInit {
  userText :any;
  textColor: string = 'black'; 

  colors: string[] = ['blue', 'rgb(255, 0, 0)', 'rgb(0, 248, 54)', 'rgb(197, 0, 66)', 'rgb(223, 171, 3)', 'rgb(0, 0, 3)', 'rgb(3, 185, 185)'];



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

  changeTextColor(color: string) {
    console.log(color)
    this.textColor = color;
  }

  getUserText() {
    this.modalCtrl.dismiss({
      text: this.userText,
      textColor: this.textColor
    });
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

  // getUserText(){
  //   this.modalCtrl.dismiss({
  //     text: this.userText
  //   });
  // }

}
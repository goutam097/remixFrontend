import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/service/alert/alert.service';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-sticker-modal',
  templateUrl: './sticker-modal.page.html',
  styleUrls: ['./sticker-modal.page.scss'],
})
export class StickerModalPage implements OnInit {
  stickerList: any = [];

  constructor(private modalCtrl: ModalController,
    private dataServ: DataService,
    private activatedRoute: ActivatedRoute,
    private alertServe: AlertService,
    private router: Router
  ) {}

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
    this.getStickerImage()
  }

  async getStickerImage() {
    await this.dataServ.getMethod(`sticker/list`).then(async (data) => {
      const res = JSON.parse(JSON.stringify(data));
      if (res?.success == true) {
        this.stickerList = res?.optimizedStickers;
      }
    });
  }
  
  getEmoji(img:any){
    this.modalCtrl.dismiss({
      image: img
    });
  }

}

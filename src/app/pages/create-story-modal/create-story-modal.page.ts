import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StickerModalPage } from '../sticker-modal/sticker-modal.page';
import { TextModalPage } from '../text-modal/text-modal.page';
import { MusicModalPage } from '../music-modal/music-modal.page';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/data/data.service';
import { AlertService } from 'src/app/service/alert/alert.service';

@Component({
  selector: 'app-create-story-modal',
  templateUrl: './create-story-modal.page.html',
  styleUrls: ['./create-story-modal.page.scss'],
})
export class CreateStoryModalPage implements OnInit {
  allowedTypes: any = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  maxSize: number = 2100000;

  isModalOpen = false;
  showColorDiv: boolean = false;
  showTextDiv: boolean = false;
  image: any;
  getImg: any;

  // stickerImage: any;
  // stickerX: number = 250;
  // stickerY: number = 170;
  // isDragging: boolean = false;

  // userText: any;
  // textX: number = 100;
  // textY: number = 100;
  // isDraggingText: boolean = false;
  // userTextcolor: any;

  stickerImage: any;
  stickerX: number = 250;
  stickerY: number = 170;
  isDragging: boolean = false;
  initialOffsetX: number = 0;
  initialOffsetY: number = 0;

  userText: any;
  textX: number = 100;
  textY: number = 100;
  isDraggingText: boolean = false;
  initialTextOffsetX: number = 0;
  initialTextOffsetY: number = 0;
  userTextcolor: any;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  constructor(
    private modalCtrl: ModalController,
    private dataServ: DataService,
    private activatedRoute: ActivatedRoute,
    private alertServe: AlertService,
    private router: Router
  ) {}

  async opeStickernModal() {
    const modal = await this.modalCtrl.create({
      component: StickerModalPage,
    });
    modal.onDidDismiss().then((e) => {
      console.log(e);
      if (e.data) {
        this.stickerImage = e.data.image;
      }
    });
    return await modal.present();
  }

  async openTextModal() {
    const modal = await this.modalCtrl.create({
      component: TextModalPage,
    });
    modal.onDidDismiss().then((e) => {
      console.log(e);
      if (e.data) {
        this.userText = e.data.text;
        this.userTextcolor = e.data.textColor;
      }
    });
    return await modal.present();
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

  showText() {
    this.showTextDiv = !this.showTextDiv;
    this.showColorDiv = false;
  }

  ngOnInit() {}

  yourImage($event: any) {
    const file = $event.files[0];
    if (file) {
      if (this.allowedTypes.includes(file.type) && file.size < this.maxSize) {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.image = {
            name: file.name,
            base64Data: reader.result?.toString(),
            size: file.size,
            type: file.name.split('.').pop().toLowerCase(),
          };
          this.createImage(this.image);
        };

        reader.readAsDataURL(file);
      } else {
        console.log('Invalid file type or size exceeded.');
      }
    }
  }

  async createImage(uploadImg: any) {
    let jsonData = {
      image: uploadImg,
    };
    await this.dataServ
      .postMethod(jsonData, `create/RemixImage`)
      .then(async (data) => {
        const res = JSON.parse(JSON.stringify(data));
        if (res?.success == true) {
          this.getImg = res?.remixs?.image;
          console.log(this.getImg);
          this.isModalOpen = true;
        }
      });
  }

  // onStickerMouseDown(event: MouseEvent): void {
  //   console.log(event)
  //   this.isDragging = true;
  //   this.offsetX = event.clientX - this.stickerX;
  //   this.offsetY = event.clientY - this.stickerY;

  //   document.addEventListener('mousemove', this.onStickerMouseMove.bind(this));
  //   document.addEventListener('mouseup', this.onStickerMouseUp.bind(this));
  // }

  // onStickerMouseMove(event: MouseEvent): void {
  //   if (this.isDragging) {
  //     this.stickerX = event.clientX - this.offsetX;
  //     this.stickerY = event.clientY - this.offsetY;
  //   }
  // }

  // onStickerMouseUp(): void {
  //   this.isDragging = false;
  //   document.removeEventListener('mousemove', this.onStickerMouseMove.bind(this));
  //   document.removeEventListener('mouseup', this.onStickerMouseUp.bind(this));
  // }

  // onTextMouseDown(event: MouseEvent): void {
  //   console.log(event)
  //   this.isDraggingText = true;
  //   this.offsetTextX = event.clientX - this.textX;
  //   this.offsetTextY = event.clientY - this.textY;

  //   document.addEventListener('mousemove', this.onStickerMouseMove.bind(this));
  //   document.addEventListener('mouseup', this.onStickerMouseUp.bind(this));
  // }

  // onTextMouseMove(event: MouseEvent): void {
  //   if (this.isDraggingText) {
  //     this.textX = event.clientX - this.offsetTextX;
  //     this.textY = event.clientY - this.offsetTextY;
  //   }
  // }

  // onTextMouseUp(): void {
  //   this.isDraggingText = false;
  //   document.removeEventListener('mousemove', this.onStickerMouseMove.bind(this));
  //   document.removeEventListener('mouseup', this.onStickerMouseUp.bind(this));
  // }

  // ===========================================================

  // onMouseDown(event: MouseEvent, type: string): void {
  //   event.preventDefault();
  //   if (type === 'sticker') {
  //     this.isDragging = true;
  //     this.stickerX = event.clientX - this.stickerX;
  //     this.stickerY = event.clientY - this.stickerY;
  //   } else if (type === 'text') {
  //     this.isDraggingText = true;
  //     this.textX = event.clientX - this.textX;
  //     this.textY = event.clientY - this.textY;
  //   }
  //   document.addEventListener('mousemove', this.onMouseMove);
  //   document.addEventListener('mouseup', this.onMouseUp);
  // }

  // onMouseMove = (event: MouseEvent): void => {
  //   if (this.isDragging) {
  //     this.stickerX = event.clientX - this.stickerX;
  //     this.stickerY = event.clientY - this.stickerY;
  //   }
  //   if (this.isDraggingText) {
  //     this.textX = event.clientX - this.textX;
  //     this.textY = event.clientY - this.textY;
  //   }
  // };

  // onMouseUp = (): void => {
  //   this.isDragging = false;
  //   this.isDraggingText = false;
  //   document.removeEventListener('mousemove', this.onMouseMove);
  //   document.removeEventListener('mouseup', this.onMouseUp);
  // };

  onMouseDown(event: MouseEvent, type: string): void {
    event.preventDefault();
    if (type === 'sticker') {
      this.isDragging = true;
      this.initialOffsetX = event.clientX - this.stickerX;
      this.initialOffsetY = event.clientY - this.stickerY;
    } else if (type === 'text') {
      this.isDraggingText = true;
      this.initialTextOffsetX = event.clientX - this.textX;
      this.initialTextOffsetY = event.clientY - this.textY;
    }
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);
  }

  onMouseMove = (event: MouseEvent): void => {
    if (this.isDragging) {
      this.stickerX = event.clientX - this.initialOffsetX;
      this.stickerY = event.clientY - this.initialOffsetY;
    }
    if (this.isDraggingText) {
      this.textX = event.clientX - this.initialTextOffsetX;
      this.textY = event.clientY - this.initialTextOffsetY;
    }
  };

  onMouseUp = (): void => {
    this.isDragging = false;
    this.isDraggingText = false;
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);
  };
}

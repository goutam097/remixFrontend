import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertService } from 'src/app/service/alert/alert.service';
import { DataService } from 'src/app/service/data/data.service';

@Component({
  selector: 'app-audo-testing',
  templateUrl: './audo-testing.page.html',
  styleUrls: ['./audo-testing.page.scss'],
})
export class AudoTestingPage implements OnInit {
  // @ViewChild('audioPlayer') audioPlayer: any;
  // audioUrl: string = './assets/music/music11.mp3';
  // snippets: any = [];
  // snippets: Snippet[] = [];

  allowedTypes: any = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
  maxSize: number = 2100000;
  image: any;
  stickerList: any = [];

  constructor(
    private modalCtrl: ModalController,
    private dataServ: DataService,
    private activatedRoute: ActivatedRoute,
    private alertServe: AlertService,
    private router: Router
  ) {}

  ngOnInit() {}

  async ionViewWillEnter() {
    this.getStickerImage();
  }

  // songsArray= [
  //   {
  //     name: "A New Beginning",
  //     path: "./assets/music/music1.mp3",
  //     singer: "Bensound.com",
  //   },
  //   {
  //     name: "A New Song",
  //     path: "./assets/music/music2.mp3",
  //     singer: "Bensound.com",
  //   }
  // ];

  // constructor() {
  //   const duration = 240;
  //   const snippetDuration = 30;
  //   for (let i = 0; i < duration; i += snippetDuration) {
  //     this.snippets.push({ start: i });
  //   }
  // }

  // selectSnippet(start: number) {
  //   const audio = this.audioPlayer.nativeElement;
  //   audio.currentTime = start;
  //   audio.play();
  //   setTimeout(() => {
  //     audio.pause();
  //   }, 30000);
  // }

  // ================================================

  // @ViewChild('audioPlayer') audioPlayer: any;
  // startPosition: number = 0;
  // endPosition: number = 0;

  // playSegment() {
  //   if (this.startPosition < 0 || this.endPosition < 0 || this.startPosition >= this.endPosition) {
  //     alert("Invalid time range");
  //     return;
  //   }
  //   this.audioPlayer.nativeElement.currentTime = this.startPosition;
  //   this.audioPlayer.nativeElement.play();
  //   setTimeout(() => {
  //     this.audioPlayer.nativeElement.pause();
  //   }, (this.endPosition - this.startPosition) * 1000);
  // }

  // ===========================================================
  @ViewChild('audioPlayer') audioPlayer: any;

  playSegment() {
    this.audioPlayer.nativeElement.currentTime = 0;
    this.audioPlayer.nativeElement.play();
    setTimeout(() => {
      this.audioPlayer.nativeElement.pause();
    }, 30000); // Stop playback after 30 seconds
  }

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
        };

        reader.readAsDataURL(file);
      } else {
        console.log('Invalid file type or size exceeded.');
      }
    }
  }

  async createImage() {
    let jsonData = {
      image: this.image,
    };
    await this.dataServ
      .postMethod(jsonData, `create/sticker`)
      .then(async (data) => {
        const res = JSON.parse(JSON.stringify(data));
        if (res?.success == true) {
          window.location.reload()
          // this.getStickerImage();
          
        }
      });
  }

  async getStickerImage() {
    await this.dataServ.getMethod(`sticker/list`).then(async (data) => {
      const res = JSON.parse(JSON.stringify(data));
      if (res?.success == true) {
        this.stickerList = res?.optimizedStickers;
      }
    });
  }

  async deleteFiles(id:any) {
    await this.dataServ.deleteMethod(`sticker/delete/${id}`).then(async (data) => {
      const res = JSON.parse(JSON.stringify(data));
      if (res?.success == true) {
        this.stickerList = this.stickerList.filter((st: any) => st._id !== id);

      }
    });
  }
}

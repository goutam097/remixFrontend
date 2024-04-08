import { Component, OnInit, ViewChild } from '@angular/core';

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
  

  ngOnInit() {
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

}

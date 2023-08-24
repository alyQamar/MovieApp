import { Component, Input, OnInit } from '@angular/core';
import {VgApiService} from '@videogular/ngx-videogular/core';





@Component({
  selector: 'video-player',
  templateUrl: './vdo-player.component.html',
  styleUrls: ['./vdo-player.component.css']
})
export class VdoPlayerComponent implements OnInit{

  @Input() video:any;
  preload: string = 'auto';
  constructor( private api:VgApiService) {}
  onPlayerReady(api: VgApiService) {
    this.api = api;
}
  ngOnInit() {

    console.log(this.video)
    this.api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
          // Set the video to the beginning
          this.api.getDefaultMedia().currentTime = 0;
      }
  );

  

  }



}

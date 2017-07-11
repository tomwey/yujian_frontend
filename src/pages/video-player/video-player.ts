import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VideoPlayer page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-video-player',
  templateUrl: 'video-player.html',
})
export class VideoPlayer {

  videoUrl: string = 'http://hb-assets.small-best.com/uploads/attachment/data/210/9ca41b31-b813-4567-90e0-fc255bc92f79.mp4?e=1815105527&token=TL7vgIdADfCg9dJGncUGqvj51t0JfO8IORBBO9JX:9LNs89xHTTiC7o-S_Ajh1eFLkNc=';
  constructor(public navCtrl: NavController, public navParams: NavParams,
  private platform: Platform) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad VideoPlayer');
    // console.log(videojs);

  }

  play() {
      let player = videojs('my-player');
      player.play();
  }

}

import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { ifvisible } from 'ifvisible.js';

/**
 * Generated class for the GrabWallPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-grab-wall-page',
  templateUrl: 'grab-wall-page.html',
})
export class GrabWallPage {

  @ViewChild('wallContent') wallContentEle: ElementRef;

  imageUrl: string = '';
  counter: number = 10;
  countDownTimer: any;
  item: any = null;
  adLoaded: boolean = false;
  hasAds: boolean = false;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewController: ViewController, 
              private platform: Platform) {
    
    // console.log(navParams);
    this.item = navParams.data;

    this.imageUrl = this.item.ad.file || '../../assets/images/hbxq_img_hb_bg.png';
    this.counter  = this.item.ad.duration || 10;

    ifvisible.setIdleDuration(120);

    ifvisible.on('statusChanged', (e) => {
      // console.log(e.status);
      if (e.status === 'active') {
        this.startTimer();
      } else if (e.status === 'hidden') {
        this.stopTimer();
      }
    });
  }

  ionViewDidLoad() {

    // 显示广告图片
    this.wallContentEle.nativeElement
      .style.backgroundImage = "url('" + this.imageUrl + "')";

    // 异步加载图片
    let bgImg = new Image();
    bgImg.src = this.imageUrl;
    bgImg.addEventListener('load', (data) => {
      // console.log(data);
      this.adLoaded = true;
      this.startTimer();
    });
    bgImg.addEventListener('error', (error) => {
      console.log(error);
    });
  }

  startTimer()
  {
    setTimeout(()=>{
      this.countDownTimer = setInterval(() => {
        if (this.counter > 0) {
          this.counter --;
          if (this.counter == 0) {
            this.stopTimer();
            this.dismiss(this.item);
          }
        }
      }, 1000);
    }, 200);
  }

  stopTimer() {
    clearInterval(this.countDownTimer);
    this.countDownTimer = null;
  }

  dismiss(data?: any) {
    this.stopTimer();

    this.viewController.dismiss(data);
  }

  videoEnded() {
    console.log('end...');
  }
}

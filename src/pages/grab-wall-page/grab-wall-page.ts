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

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewController: ViewController, 
              private platform: Platform) {
    
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
      .style.backgroundImage = "url('../../assets/images/222.jpg')";
    
    // 启动定时器
    this.startTimer();
  }

  startTimer()
  {
    setTimeout(()=>{
      this.countDownTimer = setInterval(() => {
        if (this.counter > 0) {
          this.counter --;
          if (this.counter == 0) {
            this.stopTimer();
            // this.dismiss();
          }
        }
      }, 1000);
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.countDownTimer);
    this.countDownTimer = null;
  }

  dismiss() {
    this.stopTimer();

    this.viewController.dismiss();
  }

  videoEnded() {
    console.log('end...');
  }
}

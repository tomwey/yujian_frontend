import { Component,ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Platform } from 'ionic-angular';

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
  hasAds: boolean = false;
  counter: number = 10;
  countDownTimer: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewController: ViewController, 
              private platform: Platform) {
    this.hasAds = true;

    window.addEventListener("focus", () => {
      this.startTimer();
    });
    window.addEventListener("blur", () => {
      this.stopTimer();
    });

    // this.platform.ready().then(()=>{
    //   console.log('ready...');
    // });
  }

  ionViewDidLoad() {
    this.wallContentEle.nativeElement
      .style.backgroundImage = "url('../../assets/images/222.jpg')";

    this.startTimer();
  }

  startTimer()
  {
    setTimeout(()=>{
      this.countDownTimer = setInterval(() => {
        this.counter --;
        if (this.counter == 0) {
          this.stopTimer();
          this.dismiss();
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

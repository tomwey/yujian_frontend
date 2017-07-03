import { Component } from '@angular/core';
import { IonicPage, NavController, 
         NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EventRepublishPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-republish',
  templateUrl: 'event-republish.html',
})
export class EventRepublishPage {

  event: any = null;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewController: ViewController,
              ) {
    this.event = this.navParams.data;
    this.event.rule = null;
    this.event.hb   = null;
    console.log(this.event);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EventRepublishPage');
  }

  close(): void {
    this.viewController.dismiss();
  }

  send(): void {

  }

  openRule(): void {
    
  }
  
  openHongbao(): void {

  }

}

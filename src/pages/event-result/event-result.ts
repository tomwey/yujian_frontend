import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventResult page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-result',
  templateUrl: 'event-result.html',
})
export class EventResult {
  event_earn: any = { title: '', image: '', money: '0.0' };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event_earn.title = this.navParams.data.event.title;
    this.event_earn.image = this.navParams.data.event.image;
    this.event_earn.money = this.navParams.data.money;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EventResult');
  }

  gogoGrab(): void {
    this.navCtrl.setRoot('TabsPage');
  }

}

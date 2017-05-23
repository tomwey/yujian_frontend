import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RandomHongbaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-random-hongbao',
  templateUrl: 'random-hongbao.html',
})
export class RandomHongbaoPage {

  event: any = null;
  hb: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.data;

    if (this.event.hb && this.event.hb.type === 0) {
      this.hb = this.event.hb;
    } else {
      this.hb = { total_money: 0.00, min_value: 0.00, max_value: 0.00 };
    }
  }

  saveHB(): void {
    this.event.hb = this.hb;
    this.event.hb.type = 0;
    console.log(this.event);
    this.navCtrl.pop();
  }

}

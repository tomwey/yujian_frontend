import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FixedHongbaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-fixed-hongbao',
  templateUrl: 'fixed-hongbao.html',
})
export class FixedHongbaoPage {

  event: any = null;
  hb: any = { money: '', total: null };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.data;

    if (this.event.hb && this.event.hb.type === 1) {
      this.hb.money = this.event.hb.min_value;
      this.hb.total = this.event.hb.min_value == 0 ? 0 : this.event.hb.total_money / this.event.hb.min_value;
    } else {
      this.hb = { money: 0.00, total: 0 };
    }
  }

  saveHB(): void {
    this.event.hb.min_value = this.hb.money;
    this.event.hb.max_value = this.hb.money;

    this.event.hb.total_money = this.hb.money * this.hb.total;
    this.event.hb.type = 1;
    console.log(this.event);

    this.navCtrl.pop();
  }

}

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

    if (this.event.hb && this.event.hb._type === 0) {
      this.hb = this.event.hb;
    } else {
      this.hb = { total_money: null, min_value: null, max_value: null };
    }
  }

  saveHB(): void {
    this.event.hb = { _type: 0,
                      min_value: this.hb.min_value,
                      max_value: this.hb.max_value,
                      total_money: this.hb.total_money
                     };
    this.navCtrl.popTo(this.navCtrl.getByIndex(0));
  }

  calcCount(n1, n2): string {
    if (n2 <= 0) return '-';

    return Math.floor(n1 / n2).toString();
  }

}

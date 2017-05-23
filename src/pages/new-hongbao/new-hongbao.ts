import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewHongbaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-hongbao',
  templateUrl: 'new-hongbao.html',
})
export class NewHongbaoPage {
  event: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.data;
  }

  gotoHBDetail(type: number): void {
    if (type === 0) {
      // this.event.hb.type = 0;
      this.navCtrl.push('RandomHongbaoPage', this.event);
    } else {
      // this.event.hb.type = 1;
      this.navCtrl.push('FixedHongbaoPage', this.event);
    }
  }

}

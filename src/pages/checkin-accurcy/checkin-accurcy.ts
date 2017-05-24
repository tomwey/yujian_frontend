import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CheckinAccurcyPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-checkin-accurcy',
  templateUrl: 'checkin-accurcy.html',
})
export class CheckinAccurcyPage {

  accurcy: any = { value: '' };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.accurcy = this.navParams.data;
  }

  save() {
    this.navCtrl.pop();
  }

}

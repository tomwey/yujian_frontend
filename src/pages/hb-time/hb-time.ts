import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HbTimePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hb-time',
  templateUrl: 'hb-time.html',
})
export class HBTimePage {

  startDateTime: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.startDateTime = this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HbTimePage');
  }

}

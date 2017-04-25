import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HBDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-hb-detail',
  templateUrl: 'hb-detail.html',
})
export class HBDetailPage {

  item: any = null;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
      this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HBDetail');
  }
  refresh() {
    console.log('refresh...');
  }

}

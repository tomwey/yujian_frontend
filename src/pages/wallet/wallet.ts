import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Wallet page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {
  user: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Wallet');
  }

  gotoTradeList(): void {
    this.navCtrl.push('TradeList');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service'; 
import { ToolService } from '../../providers/tool-service';

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
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private users: UserService,
              private tool: ToolService) {
    this.user = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Wallet');
    this.loadUserProfile();
  }

  loadUserProfile(): void {
    this.tool.showLoading('加载中...');
    this.users.loadUser().then(data => {
      this.tool.hideLoading();
      this.user = data;
    }).catch(error => {
      this.tool.hideLoading();
    });
  }

  gotoTradeList(): void {
    this.navCtrl.push('TradeList');
  }

}

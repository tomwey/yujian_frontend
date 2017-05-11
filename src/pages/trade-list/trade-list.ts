import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { ToolService } from '../../providers/tool-service';

/**
 * Generated class for the TradeList page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-trade-list',
  templateUrl: 'trade-list.html',
})
export class TradeList {
  trades: any = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private users: UserService,
              private tool: ToolService) {
  
    this.loadTrades();
  }

  loadTrades() {
    this.tool.showLoading('加载中...');
    this.users.loadTrades(1).then(data => {
      this.trades = data.data || data;
      this.tool.hideLoading();
    }).catch(error => {
      this.tool.hideLoading();
      this.tool.showToast(error);
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TradeList');
  }

}

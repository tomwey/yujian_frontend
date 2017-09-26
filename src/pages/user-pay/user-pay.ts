import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { ToolService } from '../../providers/tool-service';

/**
 * Generated class for the UserPayPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-pay',
  templateUrl: 'user-pay.html',
})
export class UserPayPage {

  user_pay: any = { money: null };
  payData: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private users: UserService,
    private toolService: ToolService,
  ) {
  }

  commit(): void {
    this.toolService.showLoading('正在提交申请...');
    this.users.applyPay(this.user_pay.money)
      .then(data => {
        this.toolService.hideLoading();
        this.payData = data;

        this.gotoPayQrcode();
      })
      .catch(error => {
        this.toolService.hideLoading();
        setTimeout(() => {
          this.toolService.showToast(error.message || error);
        }, 200);
      });
  }

  gotoPayQrcode(): void {
    this.navCtrl.push('UserPayQrcodePage', this.payData);
  }

}

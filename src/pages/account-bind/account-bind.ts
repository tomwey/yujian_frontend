import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { UserService } from "../../providers/user-service";
import { ToolService } from "../../providers/tool-service";
// import { TabsPage } from "../tabs/tabs";

/**
 * Generated class for the AccountBindPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-account-bind',
  templateUrl: 'account-bind.html',
})
export class AccountBindPage {
  account: any = { code: '' };
  constructor(public navCtrl: NavController,
              private users: UserService,
              private tool: ToolService) {
  }

  bind(): void {
    this.tool.showLoading('账号绑定中...');

    this.users.bindAccount(this.account.code)
      .then(data => {
        this.tool.hideLoading();
        this.navCtrl.setRoot('TabsPage');
      })
      .catch(error => {
        this.tool.hideLoading();

        setTimeout(() => {
          this.tool.showToast(error.message || error);
        }, 200);
      });
  }

  gotoUserAgreement(): void {
    this.navCtrl.push('CommWeb', { slug: 'user_agreement', title: "用户协议" });
  }

}

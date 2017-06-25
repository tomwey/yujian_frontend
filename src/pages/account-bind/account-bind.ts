import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from "../../providers/user-service";
import { ToolService } from "../../providers/tool-service";
// import { TabsPage } from "../tabs/tabs";
import { ApiService } from "../../providers/api-service";
import { UtilsServiceProvider } from "../../providers/utils-service/utils-service";

/**
 * Generated class for the AccountBindPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-account-bind',
  templateUrl: 'account-bind.html',
})
export class AccountBindPage {
  // account: any = { code: '' };
  body: string = null;
  page: any = { body: '' };
  constructor(public navCtrl: NavController,
              private users: UserService,
              private tool: ToolService,
              private api: ApiService,
              private utils: UtilsServiceProvider) {
    // this.loadUserAgreement();
  }

  loadUserAgreement(): void {
    this.tool.showLoading('加载中...');
    this.api.get('pages/user_agreement', {}).then(data => {
      // console.log(data);
      // this.page.body = data.body;
      this.page.body = data.body;
      this.tool.hideLoading();
    }).catch(error => {
      // console.log(error);
      this.tool.hideLoading();
      setTimeout(() => {
        // this.toolService.showToast(error);
      }, 100);
    });
  }

  ionViewDidLoad(): void {
    this.loadUserAgreement();
  }

  doLogin(): void {
    this.tool.showLoading('登录提交中...');
    this.utils.getWXAuthUrl(window.location.href)
      .then(data => {
        this.tool.hideLoading();

        window.location.href = data.url;

      }).catch(error => {
        this.tool.hideLoading();
        setTimeout(() => {
          this.tool.showToast('登录失败，请重试！');
        }, 200);
      });
  }

  // bind(): void {
  //   this.tool.showLoading('账号绑定中...');

  //   this.users.bindAccount(this.account.code)
  //     .then(data => {
  //       this.tool.hideLoading();
  //       this.navCtrl.setRoot(TabsPage);
  //     })
  //     .catch(error => {
  //       this.tool.hideLoading();

  //       setTimeout(() => {
  //         this.tool.showToast(error.message || error);
  //       }, 200);
  //     });
  // }

  // gotoUserAgreement(): void {
  //   this.navCtrl.push('CommWeb', { slug: 'user_agreement', title: "用户协议" });
  // }

}

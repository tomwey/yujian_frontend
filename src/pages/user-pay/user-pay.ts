import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { ToolService } from '../../providers/tool-service';
import { DomSanitizer } from '@angular/platform-browser';

import { Md5 } from 'ts-md5/dist/md5';
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
  payData: any = null;
  secUrl: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private users: UserService,
    private toolService: ToolService,
    private sanitizer: DomSanitizer,
  ) {
  }

  commit(): void {
    this.toolService.showLoading('正在提交...');
    this.users.applyPay(this.user_pay.money)
      .then(data => {
        // this.toolService.hideLoading();
        this.payData = data;

        this.requestQrcode();
        // this.showPayQrcode();
      })
      .catch(error => {
        this.toolService.hideLoading();
        setTimeout(() => {
          this.toolService.showToast(error.message || error);
        }, 200);
      });
  }

  refresh(): void {
    this.toolService.showLoading('刷新中...');

    this.requestQrcode();
  }

  requestQrcode(): void {
    let i  = new Date().getTime();
    let ak = this.generateAccessKey(i);
    
    let url = this.payData.pay_url + `?code=${this.payData.code}&i=${i}&ak=${ak}`;
    this.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  generateAccessKey(i): string {
    return Md5.hashStr(this.payData.code.toString() + i.toString() + '3666a3c050d539be71da0f3b283eb433', false).toString();
  }

  loaded(): void {
    this.toolService.hideLoading();
  }

}

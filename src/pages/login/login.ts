import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, App, Events } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { ToolService } from "../../providers/tool-service";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account: any = { mobile: '', code: '' };
  countDown: any = { timer: null, counter: '获取验证码', started: false, duration: 60 };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private app: App,
              private users: UserService,
              private tool: ToolService,
              private events: Events,
            ) {
  }

  login() {
    if (!this.checkMobile()) return;

    this.tool.showLoading('登录中...');
    this.users.login(this.account.mobile, this.account.code)
      .then(data => {
        this.tool.hideLoading();

        this.events.publish('user:login');
      })
      .catch(error => {
        this.tool.hideLoading();

        setTimeout(() => {
          this.tool.showToast(error);
        }, 100);
      });
  }

  getCode() {
    if (!this.checkMobile()) return;

    this.tool.showLoading('提交中...');
    
    this.users.getCode(this.account.mobile)
      .then(data => {
        this.tool.hideLoading();

        this.startTimer();
      })
      .catch(error => {
        this.tool.hideLoading();
        
        this.resetTimer();

        setTimeout(() => {
          this.tool.showToast(error);
        }, 100);
      });
  }

  private resetTimer() {
    if (this.countDown.timer) {
      clearInterval(this.countDown.timer);

      this.countDown.counter = '获取验证码';
      this.countDown.started = false;

      this.countDown.timer = null;

      this.countDown.duration = 60;
    }
  }

  private startTimer() {
    this.countDown.started = true;
    this.countDown.counter = `${this.countDown.duration}s`;

    if (!this.countDown.timer) {
      this.countDown.timer = setInterval(() => {
        this.countDown.counter = `${--this.countDown.duration}s`;
        if (this.countDown.duration === 0) {
          this.resetTimer();
        }
      }, 1000);
    }
  }

  gotoUserAgreement() {
    this.app.getRootNavs()[0].push('CommWeb', { slug: 'user_agreement', title: '用户协议' });
  }

  private checkMobile(): boolean {
    if (!this.account.mobile) {
      this.tool.showToast('手机号不能为空');
      return false;
    }

    if (/^1[3|4|5|8|7][0-9]\d{4,8}$/.test(this.account.mobile) === false) {
      this.tool.showToast('手机号不正确');
      return false;
    }

    return true;
  }

}

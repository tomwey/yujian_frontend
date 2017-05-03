import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  user: any = { uid: '00000000', 
                avatar: 'assets/images/default_avatar.png',
                total_earn: '0.00',
                today_earn: '0.00',
                balance: '0.00' };

  constructor(public navCtrl: NavController) {

  }

  gotoHelp(): void {
    this.openPage('http://cloud.yujian.afterwind.cn/p/help', '帮助中心');
  }

  gotoAbout(): void {
    this.openPage('http://cloud.yujian.afterwind.cn/p/about', '关于');
  }

  private openPage(url: string, title: string): void {
    this.navCtrl.push('CommWeb', { url: url, title: title });
  }

}

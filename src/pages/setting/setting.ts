import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WalletPage } from '../wallet/wallet';

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

  gotoWallet(): void {
    this.navCtrl.push('WalletPage');
  }

  gotoHBHistory(): void {
    this.navCtrl.push('HBHistory');
  }

  gotoFollowedMerchants(): void {
    this.navCtrl.push('MyMerchants');
  }

  gotoHelp(): void {
    this.openPage('help', '帮助中心');
  }

  gotoAbout(): void {
    this.openPage('about', '关于');
  }

  private openPage(slug: string, title: string): void {
    this.navCtrl.push('CommWeb', { slug: slug, title: title });
  }

}

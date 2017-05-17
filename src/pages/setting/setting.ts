import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
// import { WalletPage } from '../wallet/wallet';
import { UserService } from '../../providers/user-service'; 
import { ToolService } from '../../providers/tool-service';

@IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  user: any = { id: '00000000', 
                avatar: 'assets/images/default_avatar.png',
                earn: '0.00',
                today_earn: '0.00',
                balance: '0.00' };
  
  constructor(public navCtrl: NavController,
              private users: UserService,
              private tool: ToolService) {
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

  gotoWallet(): void {
    this.navCtrl.push('WalletPage',this.user);
  }

  gotoHBHistory(): void {
    this.navCtrl.push('HBHistory');
  }

  gotoMyEvents(): void {

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

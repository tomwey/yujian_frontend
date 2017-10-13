import { Component, ViewChild } from '@angular/core';
import { NavController, ModalController, App, Content, Platform } from 'ionic-angular';
// import { WalletPage } from '../wallet/wallet';
import { UserService } from '../../providers/user-service'; 
import { ToolService } from '../../providers/tool-service';

// @IonicPage()
@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

  @ViewChild(Content) content: Content;

  user: any = { id: '00000000', 
                avatar: 'assets/images/default_avatar.png',
                earn: '0.00',
                today_earn: '0.00',
                balance: '0.00' };
  
  constructor(public navCtrl: NavController,
              private users: UserService,
              private tool: ToolService,
              private modalCtrl: ModalController,
              private app: App,
              private platform: Platform,
              ) {
      // this.loadUserProfile();
  }

  ionViewDidLoad() {
    if (this.platform.is('mobileweb') && this.platform.is('ios')) {
      this.content.enableJsScroll();
    }
    
    this.loadUserProfile();
  }

  ionViewDidEnter() {
    this.app.setTitle('我的');
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
    this.navCtrl.push('wallet',this.user);
  }

  gotoHBHistory(): void {
    this.navCtrl.push('HBHistory',this.user);
  }

  gotoStats(): void {
    this.navCtrl.push('StatsPage');
  }

  gotoInvite(): void {
    this.users.token().then(token => {
      window.location.href = `http://b.hb.small-best.com/wx/share/invite?token=${token}`;
    });
  }

  gotoSendHBHistory(): void {
    this.navCtrl.push('MyEventsPage');
  }

  gotoMyCards(): void {
    this.navCtrl.push('MyCardsPage');
  }

  gotoCharge(): void {
    let modal = this.modalCtrl.create('ChargePage');
    modal.present();
  }

  gotoUserPay(): void {
    this.navCtrl.push('UserPayPage');
  }

  gotoMyEvents(): void {
    this.navCtrl.push('MyEventsPage')
  }

  gotoUserAgreement(): void {
    this.openPage('user_agreement', '用户协议');
  }

  gotoHelp(): void {
    this.openPage('help', '帮助中心');
  }

  gotoFeedback(): void {
    this.navCtrl.push('FeedbackPage');
  }

  gotoAbout(): void {
    this.openPage('about', '关于');
  }

  private openPage(slug: string, title: string): void {
    this.navCtrl.push('CommWeb', { slug: slug, title: title });
  }

}

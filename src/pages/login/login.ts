import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, App } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: any = { mobile: '', code: '' };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private app: App
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {

  }

  getCode() {

  }

  gotoUserAgreement() {
    this.app.getRootNavs()[0].push('CommWeb', { slug: 'user_agreement', title: '用户协议' });
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the CommWeb page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-comm-web',
  templateUrl: 'comm-web.html',
})
export class CommWeb {

  title: string = '';
  url:   string = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private sanitizer: DomSanitizer) {
    this.title = this.navParams.data.title;  
    this.url   = this.navParams.data.url;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CommWeb');
  }

  updatePageUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}

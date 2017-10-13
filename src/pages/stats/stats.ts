import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { ToolService } from '../../providers/tool-service';
import { UserService } from '../../providers/user-service';

import { Md5 } from 'ts-md5/dist/md5';

/**
 * Generated class for the StatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {

  secUrl: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sanitizer: DomSanitizer,
    private toolService: ToolService,
    private user: UserService,
  ) {
    this.prepareStatsUrl();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CardDetailPage');
    this.toolService.showLoading('加载中...');
  }

  prepareStatsUrl(): void {

    this.user.token().then(token => {
      let i  = new Date().getTime();
      let ak = this.generateAccessKey(i, token);
      
      let url = 'http://b.hb.small-best.com/wx/stats' + `?token=${token}&i=${i}&ak=${ak}`;
      this.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }).catch();
  }

  generateAccessKey(i, token): string {
    return Md5.hashStr(token + i.toString() + '3666a3c050d539be71da0f3b283eb433', false).toString();
  }

  loaded(): void {
    this.toolService.hideLoading();
  }

}

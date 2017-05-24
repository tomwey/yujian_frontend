import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../providers/user-service';
import { ToolService } from '../../providers/tool-service';

/**
 * Generated class for the HBHistory page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hb-history',
  templateUrl: 'hb-history.html',
})
export class HBHistory {

  hbList: any = [];
  user: any   = null;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private userService: UserService,
              private toolService: ToolService) {
    this.user = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HBHistory');
    this.loadHBHistory();
  }

  loadHBHistory(): void {
    this.toolService.showLoading('加载中...');

    this.userService.getHBHistory(1)
      .then(data => {
        console.log(data);
        this.toolService.hideLoading();

        this.hbList = data.data;
      })
      .catch(error => {
        console.log(error);
        this.toolService.hideLoading();
        setTimeout(() => {
          this.toolService.showToast(error);
        }, 100);
      });
  }

  gotoHBResult(item): void {
    this.navCtrl.push('EventDetailPage', item);
  }

}

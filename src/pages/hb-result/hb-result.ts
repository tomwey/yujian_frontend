import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RedPacketService } from '../../providers/red-packet-service';
import { ToolService } from '../../providers/tool-service';
// import * as moment from 'moment';

/**
 * Generated class for the HBResult page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hb-result',
  templateUrl: 'hb-result.html',
})
export class HBResultPage {
  hbid: number = null;
  hbOwner: any = { avatar: 'assets/images/default_avatar.png', 
                   name: '-' };
  hb: any = { title: '-', total: 0, open_count: 0 };
  userHB: any = { money: '0.00' };
  openedHBs: any = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private hbService: RedPacketService,
              private toolService: ToolService) {
    this.hbid = this.navParams.data.hbid;
    // console.log(moment().format('LLLL'));
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HBResult');
    this.loadHBResult();
  }

  loadHBResult(): void {
    this.toolService.showLoading('加载中...');

    this.hbService.getHBResult(this.hbid)
      .then(data => {
        console.log(data);
        
        this.hbOwner.avatar = data.hb_owner.avatar;
        this.hbOwner.name   = data.hb_owner.name;

        this.hb.title = data.title;
        this.hb.open_count = data.open_count;
        this.hb.total = data.total;

        this.userHB.money = data.my_hb.money;

        this.openedHBs = data.opened_hbs;

        this.toolService.hideLoading();
      })
      .catch(error => {
        this.toolService.hideLoading();

        setTimeout(() => {
          this.toolService.showToast(error);
        }, 100);
      });
  }

}

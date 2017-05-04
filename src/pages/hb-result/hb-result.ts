import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RedPacketService } from '../../providers/red-packet-service';
import { ToolService } from '../../providers/tool-service';

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
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private hbService: RedPacketService,
              private toolService: ToolService) {
    this.hbid = this.navParams.data.hbid;
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
      })
      .catch(error => {

      });
  }

}

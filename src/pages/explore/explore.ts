import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { RedPacketService } from '../../providers/red-packet-service';
import { HBDetailPage } from '../hb-detail/hb-detail';

@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage {

  hbData: any = [];

  constructor(public navCtrl: NavController,
              private toolService: ToolService,
              private hbService: RedPacketService) {
      
  }

  ionViewDidLoad() {
    this.reload();
  }

  reload() {
    this.toolService.showLoading('拼命加载中...');
    this.hbService.hbList().then(data => {
      this.hbData = data
      this.toolService.hideLoading();
    }).catch(err => {
      this.toolService.hideLoading();
      this.toolService.showToast('加载失败了！');
    });
  }

  gotoDetail(hb) {
    this.navCtrl.push(HBDetailPage, { item: hb });
  }

}

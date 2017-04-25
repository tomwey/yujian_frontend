import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { RedPacketService } from '../../providers/red-packet-service';

/**
 * Generated class for the HBDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-hb-detail',
  templateUrl: 'hb-detail.html',
})
export class HBDetailPage {

  item: any = null;
  hbItem: any = null;
  isLoading: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toolService: ToolService,
              private hbService: RedPacketService) {
      this.item = this.navParams.get('item');
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HBDetail');
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    this.toolService.showLoading('拼命加载中...');
    this.hbService.hbBody('605c28475de649628bba70458145f1d0', this.item.id)
      .then(data => {
        console.log(data);
        
        this.hbItem = data;

        this.toolService.hideLoading();
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.toolService.hideLoading();

        this.toolService.showToast(err);

        this.isLoading = false;
      });
  }

  refresh() {
    console.log('refresh...');
  }

}

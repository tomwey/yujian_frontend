import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
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
  merchantIsFollowed: boolean = false;
  followsCount: number = 0;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private toolService: ToolService,
              private hbService: RedPacketService,
              private modalCtrl: ModalController) {
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

        this.merchantIsFollowed = this.hbItem.followed;
        this.followsCount = this.hbItem.owner.follows_count;

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

  grab() {
    let modal = this.modalCtrl.create('GrabWallPage', {
      enableBackdropDismiss: false,
    });
    modal.present();
  }

  follow() {
    let merchId = this.hbItem.owner.id;

    this.toolService.showLoading();

    if (this.merchantIsFollowed) {
      this.hbService.unfollow('605c28475de649628bba70458145f1d0', merchId).then(data => {
        this.merchantIsFollowed = false;

        if (this.followsCount >= 1) {
          this.followsCount -= 1;
        }

        this.toolService.hideLoading();

        // this.toolService.showToast('取消关注成功!');
      }).catch(error => {
        this.toolService.hideLoading();
        // this.toolService.showToast('取消关注失败!');
      });
    } else {
      this.hbService.follow('605c28475de649628bba70458145f1d0', merchId).then(data => {
        this.merchantIsFollowed = true;
        this.toolService.hideLoading();
        this.followsCount += 1;

        // this.toolService.showToast('关注成功!');

      }).catch(error => {
        this.toolService.hideLoading();
        // this.toolService.showToast('关注失败!');
      });
    }
  }

}

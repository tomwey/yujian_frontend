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
const USER_TOKEN = '605c28475de649628bba70458145f1d0';

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
    this.hbService.hbBody(USER_TOKEN, this.item.id)
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
    this.toolService.showLoading();

    this.hbService.grab(USER_TOKEN, this.item.id)
      .then(data => {
        // console.log(data);
        this.toolService.hideLoading();
        
        this.showGrabWall(data);
      })
      .catch(error => {
        this.toolService.hideLoading();
        this.toolService.showToast(error);
      });
  }

  showGrabWall(data) {
    let modal = this.modalCtrl.create('GrabWallPage', data, {
      enableBackdropDismiss: false,
    });
    modal.onDidDismiss(data => {
      if (data) {
        this.openHB(data);
      } else {

      }
    });
    modal.present();
  }

  openHB(data) {
    this.toolService.showLoading('红包领取中...');

    this.hbService.open(USER_TOKEN, data.hb.id, data.ad.id)
      .then( (data) => {
        console.log(data);
        this.toolService.hideLoading();
      })
      .catch(error => {
        this.toolService.hideLoading();
        this.toolService.showToast(error);
      });
  }

  follow() {
    let merchId = this.hbItem.owner.id;

    this.toolService.showLoading();

    if (this.merchantIsFollowed) {
      this.hbService.unfollow(USER_TOKEN, merchId).then(data => {
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
      this.hbService.follow(USER_TOKEN, merchId).then(data => {
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

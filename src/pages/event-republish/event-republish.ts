import { Component } from '@angular/core';
import { IonicPage, NavController, 
         NavParams, ViewController } from 'ionic-angular';
import { ToolService } from "../../providers/tool-service";
import { EventsService } from "../../providers/events-service";

/**
 * Generated class for the EventRepublishPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-republish',
  templateUrl: 'event-republish.html',
})
export class EventRepublishPage {

  hbId: number = null;
  hb: any = { type: '0', total_money: null, min_value: null, max_value: null, total: null, value: null };
  share_hb: any = { type: '0', total_money: null, min_value: null, max_value: null, total: null, value: null };
  canCommit: boolean = false;

  leftMoney: number = 0.00;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewController: ViewController,
              private tool: ToolService,
              private events: EventsService,
              ) {
    this.hbId = this.navParams.data.id;

    if (this.navParams.data && this.navParams.data.shb) {
      this.leftMoney = this.navParams.data.shb.left_money;
    }
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EventRepublishPage');
  }

  commit(): void {

    // 广告红包
    let hb;
    if (this.hb.type === '0') {
      hb = { type: 0, 
             total_money: this.hb.total_money,
             min_value: this.hb.min_value, 
             max_value: this.hb.max_value };
    } else {
      hb = { type: 1, 
             total: this.hb.total,
             value: this.hb.value};
    }

    // 分享红包
    let share_hb = null;
    if (this.share_hb.type === '0') {
      share_hb = { type: 0, 
             total_money: this.share_hb.total_money,
             min_value: this.share_hb.min_value, 
             max_value: this.share_hb.max_value };
    } else {
      share_hb = { type: 1, 
             total: this.share_hb.total,
             value: this.share_hb.value};
    }

    hb.share_hb = share_hb

    this.tool.showLoading('提交中...');

    this.events.republish(this.hbId, hb)
      .then(data => {
        this.tool.hideLoading();

        // setTimeout(() => {
        //   this.tool.showToast('发布成功');
        // }, 200);

        this.viewController.dismiss(true).catch(()=>{});
      })
      .catch(error => {
        this.tool.hideLoading();
        
        this.resetForm();

        setTimeout(() => {
          this.tool.showToast(error);
        }, 200);
      });
  }

  resetForm() {
    this.hb = { type: '0', total_money: null, min_value: null, max_value: null, total: null, value: null };
  }

  calcuTotalMoney(): string {
    if (this.hb.type === '0') {
      if (this.hb.total_money && this.hb.total_money > 0) {
        return `${this.hb.total_money}元`;
      } else {
        return '--'
      }
    } else {
      if (this.hb.total && this.hb.value) {
        let totalValue = this.hb.total * this.hb.value;
        return totalValue > 0 ? `${totalValue}元` : '--'; 
      } else {
        return '--';
      }
    }
  }

  calcuTotal(): string {
    if (this.hb.type === '0') {
      // 随机红包
      if (this.hb.total_money && this.hb.total_money > 0 &&
          this.hb.min_value && this.hb.min_value > 0 && 
          this.hb.max_value && this.hb.max_value > 0 && 
          this.hb.min_value < this.hb.max_value) {
            let min = Math.floor(this.hb.total_money / this.hb.max_value);
            let max = Math.floor(this.hb.total_money / this.hb.min_value);

            if (min <= 0) {
              return '--';
            }

            return `${min} - ${max}`;
          } else {
            return '--';
          }
    } else {
      // 固定红包
      if (this.hb.total && this.hb.total > 0) {

        return this.hb.total.toString();
      } else {

        return '--';
      }
    }
  }

  calcuTotalMoney2(): string {
    if (this.share_hb.type === '0') {
      if (this.share_hb.total_money && this.share_hb.total_money > 0) {
        return `${this.share_hb.total_money}元`;
      } else {
        return '--'
      }
    } else {
      if (this.share_hb.total && this.share_hb.value) {
        let totalValue = this.share_hb.total * this.share_hb.value;
        return totalValue > 0 ? `${totalValue}元` : '--'; 
      } else {
        return '--';
      }
    }
  }

  calcuTotal2(): string {
    if (this.share_hb.type === '0') {
      // 随机红包
      if (this.share_hb.total_money && this.share_hb.total_money > 0 &&
          this.share_hb.min_value && this.share_hb.min_value > 0 && 
          this.share_hb.max_value && this.share_hb.max_value > 0 && 
          this.share_hb.min_value < this.share_hb.max_value) {
            let min = Math.floor(this.share_hb.total_money / this.share_hb.max_value);
            let max = Math.floor(this.share_hb.total_money / this.share_hb.min_value);

            if (min <= 0) {
              return '--';
            }

            return `${min} - ${max}`;
          } else {
            return '--';
          }
    } else {
      // 固定红包
      if (this.share_hb.total && this.share_hb.total > 0) {

        return this.share_hb.total.toString();
      } else {

        return '--';
      }
    }
  }

  close(): void {
    this.viewController.dismiss();
  }
}

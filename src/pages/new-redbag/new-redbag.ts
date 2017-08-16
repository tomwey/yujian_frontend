import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToolService } from "../../providers/tool-service";
import { EventsService } from "../../providers/events-service";

/**
 * Generated class for the NewRedbagPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-new-redbag',
  templateUrl: 'new-redbag.html',
})
export class NewRedbagPage {

  hb: any = { title: null, type: '0', total_money: null, min_value: null, max_value: null, total: null, value: null };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private tool: ToolService,
              private events: EventsService,
            ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewRedbagPage');
  }

  commit(): void {

        this.tool.showLoading('提交中...');
        
        let minVal = this.hb.type === '0' ? this.hb.min_value : this.hb.value;
        let maxVal = this.hb.type === '0' ? this.hb.max_value : this.hb.value;
        let totalMoney = this.hb.type === '0' ? this.hb.total_money : 
          (this.hb.total.to_i * this.hb.value.to_f);

        let payload = { 
          title: this.hb.title,
          _type: this.hb.type,
          min_value: minVal,
          max_value: maxVal,
          total_money: totalMoney,
         }

        this.events.send(payload)
          .then(data => {
            this.tool.hideLoading();
            
            console.log(data);

            // setTimeout(() => {
            //   this.tool.showToast('发布成功');
            // }, 200);
    
            // this.viewController.dismiss(true).catch(()=>{});
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
    this.hb = { title: null, type: '0', total_money: null, min_value: null, max_value: null, total: null, value: null };
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

}

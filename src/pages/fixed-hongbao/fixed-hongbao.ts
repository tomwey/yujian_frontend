import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';

/**
 * Generated class for the FixedHongbaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-fixed-hongbao',
  templateUrl: 'fixed-hongbao.html',
})
export class FixedHongbaoPage {

  event: any = null;
  hb: any = { money: '', total: null };
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tool: ToolService) {
    this.event = this.navParams.data;

    if (this.event.hb && this.event.hb._type === 1) {
      this.hb.money = this.event.hb.min_value;
      this.hb.total = this.event.hb.min_value == 0 ? 0 : this.event.hb.total_money / this.event.hb.min_value;
    } else {
      this.hb = { money: '', total: null };
    }
  }

  saveHB(): void {
    if (this.hb.money < 0.01) {
      this.tool.showToast('单个红包金额不能低于0.01元');
      return;
    }

    if (this.hb.total < 1) {
      this.tool.showToast('红包个数至少为1');
      return;
    }

    let regex = /^\d+$/;
    if (!regex.test(this.hb.total)) {
      this.tool.showToast('红包个数必须为整数');
      return;
    }

    let calc_total = this.hb.money * this.hb.total
    if (calc_total < 2) {
      this.tool.showToast('红包总金额不能低于2元');
      return;
    }
    
    this.event.hb = { _type: 1, 
                      min_value: this.hb.money,
                      max_value: this.hb.money,
                      total_money: this.hb.money * this.hb.total
                    }; 
    // console.log(this.event);
    this.navCtrl.popTo(this.navCtrl.getByIndex(0));
  }

  calcMoney(n1, n2): string {
    return (n1*n2).toString();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';

/**
 * Generated class for the RandomHongbaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-random-hongbao',
  templateUrl: 'random-hongbao.html',
})
export class RandomHongbaoPage {

  event: any = null;
  hb: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tool: ToolService) {
    this.event = this.navParams.data;

    if (this.event.hb && this.event.hb._type === 0) {
      this.hb = this.event.hb;
    } else {
      this.hb = { total_money: null, min_value: null, max_value: null };
    }
  }

  saveHB(): void {
    if (this.hb.total_money < 2) {
      this.tool.showToast('红包总金额不能低于2元');
      return;
    }

    if (this.hb.min_value < 0.01) {
      this.tool.showToast('最小红包金额不能小于0.01元');
      return;
    }

    if (this.hb.max_value < this.hb.min_value) {
      this.tool.showToast('最大红包金额不能小于最小红包金额');
      return;
    }

    if (this.hb.max_value > 10) {
      this.tool.showToast('最大红包金额不能超过红包总金额');
      return;
    }

    this.event.hb = { _type: 0,
                      min_value: this.hb.min_value,
                      max_value: this.hb.max_value,
                      total_money: this.hb.total_money
                     };
    this.navCtrl.popTo(this.navCtrl.getByIndex(0));
  }

  calcCount(n1, n2): string {
    if (n2 <= 0) return '-';

    return Math.floor(n1 / n2).toString();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PayService } from '../../providers/pay-service';
import { ToolService } from "../../providers/tool-service";

/**
 * Generated class for the ChargePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-charge',
  templateUrl: 'charge.html',
})
export class ChargePage {

  charge: any = { money: 0.00 };
  customMoney: number = null;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewController: ViewController,
              private pay: PayService,
              private tool: ToolService) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ChargePage');
  }

  changeMoney(money): void {
    this.charge.money = money;
    this.customMoney  = null;
  }

  doCharge(): void {
    if (this.charge.money > 0) {
      this.tool.showLoading('提交中...');

      this.pay.payIn(this.charge.money)
        .then(data => {
          this.tool.hideLoading();
          wx.chooseWXPay({
            timestamp: data.timeStamp,
            nonceStr: data.nonceStr,
            package: data.package,
            signType: data.signType,
            paySign: data.paySign,
            success: (res) => {
              
              // this.tool.showToast('支付成功');

              this.close();
            },
            fail: (error) => { 
              // this.tool.hideLoading();

              this.tool.showToast('支付失败，请重试: ' + error);
            },
            cancel: () => {
              // this.tool.hideLoading();

              this.tool.showToast('支付未完成，请尽快支付');
            }
          });
        })
        .catch(error => {
          this.tool.hideLoading();

          this.tool.showToast('发起微信支付失败，请重试');
        });
    } else {
      this.tool.showToast('充值金额至少为1元');
    }
  }

  close(): void {
    this.viewController.dismiss()
      .then(data => {
        console.log(data);
      })
      .catch(error=>{
        console.log(error);
      })
  }

}

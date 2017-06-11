import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PayService } from '../../providers/pay-service';
import { ToolService } from '../../providers/tool-service';
import { UserService } from '../../providers/user-service';

/**
 * Generated class for the WithdrawPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {

  user: any = null;
  type: number = null;
  title: string = null;
  namePlaceholder: string = null;

  moneyOptions: any = [];
  money: number = 10;

  account: any = { no: '', name: '' };

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private pay: PayService,
              private tool: ToolService,
              private users: UserService) {
    this.user = this.navParams.data.user;
    this.type = this.navParams.data.type;

    this.title = this.type === 0 ? '支付宝提现' : '微信提现';
    this.namePlaceholder = this.type === 0 ? '支付宝实名认证的姓名' : '微信号所绑定银行卡的真是姓名';

    this.moneyOptions = [{
      label: '10元',
      value: 10,
    },
    {
      label: '30元',
      value: 30,
    },
    {
      label: '50元',
      value: 50,
    },
    {
      label: '100元',
      value: 100,
    },
    ];
  }

  commit(): void {
    let money   = parseInt(this.money.toString());
    let accNo   = this.type === 0 ? this.account.no : this.account.name;
    let accName = this.account.name;
    let note    = this.type === 0 ? '支付宝提现' : '微信提现';

    if (!accNo) {
      this.tool.showToast('提现账号不能为空');
      return;
    }

    if (!accName) {
      this.tool.showToast('提现姓名不能为空');
      return;
    }

    this.tool.showLoading('提交中...');

    this.pay.withdraw(money, accNo, accName, note)
      .then(data => {
        this.tool.hideLoading();

        setTimeout(() => {
          this.tool.showToast('提现申请成功');

          this.navCtrl.pop();
        }, 200);
      })
      .catch(error => {
        this.tool.hideLoading();

        setTimeout(() => {
          this.tool.showToast(error.message || error);
        }, 200);
      });
  }

}

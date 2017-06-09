import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
              private viewController: ViewController) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad ChargePage');
  }

  changeMoney(money): void {
    this.charge.money = money;
    this.customMoney  = null;
  }

  doCharge(): void {

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

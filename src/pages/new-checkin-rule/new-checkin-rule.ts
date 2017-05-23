import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the NewCheckinRulePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-checkin-rule',
  templateUrl: 'new-checkin-rule.html',
})
export class NewCheckinRulePage {

  event: any = null;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams) {
    this.event = this.navParams.data;
  }

  saveRule(): void {
    this.navCtrl.popTo(this.navCtrl.getByIndex(0));
  }

  searchLocation(): void {
    this.navCtrl.push('SearchLocationPage', this.event);
  }

  gotoAccurcy(): void {

  }

}

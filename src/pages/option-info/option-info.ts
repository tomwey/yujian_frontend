import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OptionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-option-info',
  templateUrl: 'option-info.html',
})
export class OptionInfoPage {

  event: any = null;
  location: any = { address: '', latLng: '' };
  range: any = { value: '' };
  startDateTime: any = { date: null, time: null };
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.event = this.navParams.data;
  }

  save(): void {
    this.event.started_at = this.startDateTime.date + ' ' + this.startDateTime.time;
    this.event.range = this.range.value;
    this.event.location = this.location.latLng;

    this.navCtrl.popTo(this.navCtrl.getByIndex(0));
  }

  gotoHBTime() {
    this.navCtrl.push('HBTimePage', this.startDateTime);
  }

  gotoAddress() {
    this.navCtrl.push('SearchLocationPage', this.location);
  }

  gotoScope() {
    this.navCtrl.push('EventScopePage', this.range);
  }

}

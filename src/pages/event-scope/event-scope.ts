import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the EventScopePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-scope',
  templateUrl: 'event-scope.html',
})
export class EventScopePage {

  range: any = null;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.range = this.navParams.data;
  }

}

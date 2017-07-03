import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App } from 'ionic-angular';
import { UserService } from "../../providers/user-service";
// import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the EventResult page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-result',
  templateUrl: 'event-result.html',
})
export class EventResult {
  event_earn: any = { title: '', image: '', money: '0.0' };
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private events: Events,
              private users: UserService,
              private app: App) {
      this.event_earn.title = this.navParams.data.event.title;
      this.event_earn.image = this.navParams.data.event.image;
      this.event_earn.money = this.navParams.data.money;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EventResult');
  }

  gotoGrab(): void {
    this.events.publish('hb:opened');
    this.navCtrl.popTo(this.navCtrl.getByIndex(0));
  }

  doShare(): void {
    this.users.token().then(token => {
      window.location.href = `http://b.hb.small-best.com/wx/share/event?id=${this.navParams.data.event.id}&token=${token}`;
    });
  }

}

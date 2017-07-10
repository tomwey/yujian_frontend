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
  share_tip: string = '叫朋友来抢';
  
  error_message: string = null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private events: Events,
              private users: UserService,
              private app: App) {

      if (this.navParams.data.code && this.navParams.data.code === -1001) {
        // 提交失败
        this.error_message = this.navParams.data.message || '打开红包失败了！';
      } else {
        // 提交成功
        if ( this.navParams.data.event ) {
          this.event_earn.title = this.navParams.data.event.title;
          this.event_earn.image = this.navParams.data.event.image;
        }
        
        if ( this.navParams.data ) {
          this.event_earn.money = this.navParams.data.money;
        }
        
      }

      if (this.navParams.data.event && 
          this.navParams.data.event.share_hb &&
          this.navParams.data.event.share_hb.left_money > 0.0) {
          this.share_tip = "点击分享继续得红包，送完为止";
      }
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

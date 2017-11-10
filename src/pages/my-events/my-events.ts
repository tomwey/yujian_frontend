import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, IonicPage } from 'ionic-angular';
import { EventsService } from "../../providers/events-service";
import { ToolService } from "../../providers/tool-service";
import { UserService } from "../../providers/user-service";

// import { EventDetailPage } from "../event-detail/event-detail";
/**
 * Generated class for the MyEventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-my-events',
  templateUrl: 'my-events.html',
})
export class MyEventsPage {

  eventsData: any = [];
  needShowEmptyResult: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private events: EventsService,
              private tool: ToolService,
              private users: UserService,
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.loadData(null);
  }

  doRefresh(refresher) {
    this.loadData(refresher);
  }

  republish(e, event): void {
    e.stopPropagation();

    let modal = this.modalCtrl.create('EventRepublishPage', event);
    modal.onDidDismiss(data => {
      if (data) {
        this.loadData(null);
      }
    });
    modal.present();
    // this.navCtrl.push('EventRepublishPage', event);
    // console.log('ddd');
  }

  doShare(e, hb): void {
    // console.log('123');
    e.stopPropagation();

    this.users.token().then(token => {
      window.location.href = `http://b.hb.small-best.com/wx/share/hb2?id=${hb.id}&token=${token}`;
    });
  }

  gotoEventDetail(event): void {
    // this.navCtrl.push('EventDetailPage', event);
    // this.navCtrl.push(EventDetailPage, event);
  }
  loadData(refresher): void {

    if (!refresher)
      this.tool.showLoading('拼命加载中...');

    this.events.getMyEvents(1)
      .then(data => {
        // console.log(data);
        this.eventsData = data.data || data;
        
        this.tool.hideLoading();

        this.needShowEmptyResult = this.eventsData.length === 0;

        if (refresher) {
          refresher.complete();
        }
      }).catch(error => {
        this.tool.hideLoading();

        if (refresher) {
          refresher.complete();
        }
        
        setTimeout(() => {
          this.tool.showToast(error.message || error);
        }, 200);
      });
  }

}

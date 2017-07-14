import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { EventsService } from "../../providers/events-service";
import { ToolService } from "../../providers/tool-service";

// import { EventDetailPage } from "../event-detail/event-detail";
/**
 * Generated class for the MyEventsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
//@IonicPage()
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
              private modalCtrl: ModalController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  republish(e, event): void {
    e.stopPropagation();

    let modal = this.modalCtrl.create('EventRepublishPage', event);
    modal.onDidDismiss(data => {
      if (data) {
        this.loadData();
      }
    });
    modal.present();
    // this.navCtrl.push('EventRepublishPage', event);
    // console.log('ddd');
  }

  gotoEventDetail(event): void {
    this.navCtrl.push('EventDetailPage', event);
    // this.navCtrl.push(EventDetailPage, event);
  }
  loadData(): void {
    this.tool.showLoading('拼命加载中...');

    this.events.getMyEvents(1)
      .then(data => {
        // console.log(data);
        this.eventsData = data.data || data;
        
        this.tool.hideLoading();

        this.needShowEmptyResult = this.eventsData.length === 0;
      }).catch(error => {
        this.tool.hideLoading();

        setTimeout(() => {
          this.tool.showToast(error.message || error);
        }, 200);
      });
  }

}

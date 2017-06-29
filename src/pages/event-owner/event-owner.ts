import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolService } from "../../providers/tool-service";
import { EventsService } from "../../providers/events-service";

/**
 * Generated class for the EventOwnerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-owner',
  templateUrl: 'event-owner.html',
})
export class EventOwnerPage {

  owner: any = null;
  eventsData: any = [];
  eventId: number = null;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private tool: ToolService,
              private events: EventsService) {
    this.owner = this.navParams.data.owner;
    this.eventId = this.navParams.data.eventId;
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData(): void {
    this.tool.showLoading('拼命加载中...');

    this.events.getEventOwner(this.eventId)
      .then(data => {
        this.tool.hideLoading();

        this.owner = data.owner;
        this.eventsData = data.events;

      })
      .catch(error => {
        this.tool.hideLoading();

        setTimeout(() => {
          this.tool.showToast(error.message || error);
        }, 200);
      });
  }

  goBack(): void {
    this.navCtrl.pop();
  }

  gotoEventDetail(event): void {
    this.navCtrl.push('EventDetailPage', event);
  }

}

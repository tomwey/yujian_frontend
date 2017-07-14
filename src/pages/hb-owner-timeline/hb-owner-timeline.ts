import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolService } from "../../providers/tool-service";
import { EventsService } from "../../providers/events-service";
// import { EventDetailPage } from "../event-detail/event-detail";

/**
 * Generated class for the HbOwnerTimelinePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-hb-owner-timeline',
  templateUrl: 'hb-owner-timeline.html',
})
export class HBOwnerTimelinePage {

  owner: any = null;

  hbData: any = [];

  hbId: number = null;
  hasLoaded: boolean = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private tool: ToolService,
              private events: EventsService) {
    // this.hbId = this.navParams.data.hbId;
    this.owner = this.navParams.data.owner;
    this.hbId = this.navParams.data.hbId;
    // this.hbData = this.navParams.data.hbData;
  }

  ionViewDidEnter() {
    if (!this.hasLoaded) {
      this.hasLoaded = true;

      this.loadData();
    }
  }

  loadData(): void {
    this.tool.showLoading('拼命加载中...');

    this.events.getHBOwnerTimeline(this.hbId)
      .then(data => {
        this.tool.hideLoading();
        this.owner = data.owner;
        this.hbData = data.hb_list;
      })
      .catch(error => {
        this.tool.hideLoading();

        setTimeout(() => {
          this.tool.showToast(error.message || error);
        }, 200);
      });
  }

  gotoEventDetail(event): void {
    this.navCtrl.push('EventDetailPage', event);
    // this.navCtrl.push(EventDetailPage, event);
  }

}

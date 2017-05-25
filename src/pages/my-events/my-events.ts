import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsService } from "../../providers/events-service";
import { ToolService } from "../../providers/tool-service";
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
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private events: EventsService,
              private tool: ToolService) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  gotoEventDetail(event): void {
    this.navCtrl.push('EventDetailPage', event);
  }
  loadData(): void {
    this.tool.showLoading('拼命加载中...');

    this.events.getMyEvents(1)
      .then(data => {
        this.eventsData = data.data || data;
        this.tool.hideLoading();
        if (this.eventsData.length === 0 ) {
          setTimeout(() => {
            this.tool.showToast('没有数据显示');
          }, 200);
        }
      }).catch(error => {
        this.tool.hideLoading();

        setTimeout(() => {
          this.tool.showToast(error.message || error);
        }, 200);
      });
  }

}

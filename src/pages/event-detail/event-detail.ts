import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventsService } from '../../providers/events-service';
import { ToolService } from '../../providers/tool-service';

/**
 * Generated class for the EventDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  event: any = null;
  answer: string = '';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private events: EventsService,
              private toolService: ToolService) {
    // console.log(this.navParams.data);
    this.event = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EventDetail');
    setTimeout(() => {
      this.loadEvent();
    }, 100);
  }

  loadEvent(): void {
    this.toolService.showLoading();

    this.events.getEvent(this.event.id)
      .then(data => {
        this.event = data;
        this.toolService.hideLoading();
        console.log(data);
      })
      .catch(error => {
        this.toolService.hideLoading();
        setTimeout(() => {
          this.toolService.showToast(error);
        }, 200);
      });
  }

}

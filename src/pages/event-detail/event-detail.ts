import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EventsService } from '../../providers/events-service';
import { ToolService } from '../../providers/tool-service';
import { QQMaps } from '../../providers/qq-maps';

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
  position: any = null;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private events: EventsService,
              private toolService: ToolService,
              private modalCtrl: ModalController,
              private qqMaps: QQMaps) {
    // console.log(this.navParams.data);
    this.event = this.navParams.data;

    this.fetchUserLocation();
  }

  fetchUserLocation(): void {
    this.qqMaps.startLocating().then(position => {
      this.position = position;
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EventDetail');
    setTimeout(() => {
      this.loadEvent();
    }, 20);
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

  commit(): void {
    if (this.event.rule_type === 'QuizRule' && this.answer === '') {
      this.toolService.showToast('必须选择一个答案');
      return;
    } 

    this.showGrabWall();
  }

  showGrabWall(): void {
    let loc = `${this.position.lat},${this.position.lng}`;
    let answers = this.event.rule.answers;
    let answerOption = answers.indexOf(this.answer);
    let payload = { event: this.event, answer: answerOption, location:  loc };
    let modal = this.modalCtrl.create('HBWallPage', payload, {
      enableBackdropDismiss: false,
    });
    modal.present();
  }
}

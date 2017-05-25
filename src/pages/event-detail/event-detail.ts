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
  earns: any = [];
  
  pageNo: number = 1;
  pageSize: number = 20;
  totalPage: number = 1;
  needLoadMore: boolean = false;
  
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
    }).catch(error => {
      console.log(error);
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad EventDetail');
    setTimeout(() => {
      this.loadEvent();
    }, 20);

    setTimeout(() => {
      this.loadEventEarns();
    }, 20);
  }

  gotoReport(): void {
    let modal = this.modalCtrl.create('ReportPage', { eventId: this.event.id });
    modal.present();
  }

  loadEvent(): void {
    this.toolService.showLoading();

    this.events.getEvent(this.event.id)
      .then(data => {
        this.event = data;
        
        this.event.view_count += 1;

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

  doLike(): void {
    this.toolService.showLoading('点赞中...');

    this.events.like(this.event.id, null)
      .then(data => {
        this.event.likes_count += 1;
        this.toolService.hideLoading();
      })
      .catch(error => {
        this.toolService.hideLoading();
        setTimeout(() => {
          this.toolService.showToast(error.message || error);
        }, 200);
      });
  }

  loadEventEarns(): Promise<any> 
  {
    return new Promise((resolve,reject) => {
      if (this.pageNo <= this.totalPage) {
        this.events.getEventEarns(this.event.id, this.pageNo, this.pageSize)
          .then(data => {
            if ( this.pageNo == 1 ) {
              this.totalPage = ( data.total + this.pageSize - 1 ) / this.pageSize;
              this.earns = data.data;
            } else {
              this.earns.push(data.data);
            }
            resolve(data);
            // console.log(data);
            this.pageNo ++;
            this.needLoadMore = data.data.length == this.pageSize;
          })
          .catch(error => {
            reject(error);
          });
      }
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
    
    let payload;
    if (this.event.rule_type === 'QuizRule') {
      let answers = this.event.rule.answers;
    let answerOption = answers.indexOf(this.answer);
      payload = { event: this.event, answer: answerOption, location:  loc };
    } else if ( this.event.rule_type === 'CheckinRule' ) {
      payload = { event: this.event, location:  loc };
    }
    
    let modal = this.modalCtrl.create('HBWallPage', payload, {
      enableBackdropDismiss: false,
    });
    modal.present();
  }
}

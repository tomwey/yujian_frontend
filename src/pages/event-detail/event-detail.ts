import { Component} from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { EventsService } from '../../providers/events-service';
import { ToolService } from '../../providers/tool-service';
import { UserService } from '../../providers/user-service';
import { WechatProvider } from "../../providers/wechat/wechat";

/**
 * Generated class for the EventDetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  hb: any = null;
  answer: string = '';
  position: any = null;
  earns: any = [];
  
  pageNo: number = 1;
  pageSize: number = 20;
  totalPage: number = 1;
  hasMore: boolean = false;

  hasLoaded: boolean = false;
  
  disableCommit: boolean = false;
  commitButtonText: string = '';

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private events: EventsService,
              private toolService: ToolService,
              private modalCtrl: ModalController,
              private users: UserService,
              private noti: Events,
              private wechat: WechatProvider) {
    // console.log(this.navParams.data);
    this.hb = this.navParams.data;
  }

  // private _addShare() {
  //   this.users.token().then(token => {
  //     this.wechat.share('event_share_url', token, this.event.id)
  //       .then(data => {
  //       })
  //       .catch(error => {

  //       });
  //   });
  // }

  ionViewDidLoad() {
    this.noti.subscribe('hb:opened', () => {
      this.loadEvent();
    });
  }

  ionViewDidEnter() {
    if (!this.hasLoaded) {
      this.hasLoaded = true;
      this.loadEvent();
    }

    // this.users.token().then(token => {
    //   if (!token) {
        
    //   }
    // });
    // this._addShare();
  }

  openOwnerInfo(): void {

     this.navCtrl.push('HBOwnerTimelinePage', { owner: this.hb.owner, 
       hbId: this.hb.id });

    // this.toolService.showLoading('加载中...');

    // this.events.getHBOwnerTimeline(this.hb.id)
    //   .then(data => {
    //     this.toolService.hideLoading();

    //     this.navCtrl.push('HBOwnerTimelinePage', { owner: data.owner, hbData: data.hb_list });
    //   })
    //   .catch(error => {
    //     this.toolService.hideLoading();

    //     setTimeout(() => {
    //       this.toolService.showToast('加载出错了~');
    //     }, 200);
    //   });
    
    // this.navCtrl.push('EventOwnerPage', { owner: this.hb.owner, eventId: this.hb.id });
  }
// 
  gotoReport(): void {
    let modal = this.modalCtrl.create('ReportPage', { eventId: this.hb.id });
    modal.present();
  }

  loadEvent(): void {
    this.toolService.showLoading('拼命加载中...');

    this.events.getEvent(this.hb.id)
      .then(data => {
        setTimeout(() => {
          // console.log(data);
          this.hb = data;
          this.hb.view_count += 1;
          this.toolService.hideLoading();

          this.disableCommit = !!this.hb.disable_text
          this.commitButtonText = this.hb.disable_text ? 
            this.hb.disable_text : this.hb.rule.action;
        }, 0);
        
        this.loadEventEarns();
        // console.log(data);
      })
      .catch(error => {
        this.toolService.hideLoading();
        setTimeout(() => {
          this.toolService.showToast(error);
        }, 200);
      });
  }

  doShare(): void {
    // document.getElementById('share-tip-modal').style.display = "block";
    this.users.token().then(token => {
      window.location.href = `http://b.hb.small-best.com/wx/share/hb?id=${this.hb.id}&token=${token}&is_hb=1`;
    });
  }

  closeModal(): void {
    document.getElementById('share-tip-modal').style.display = "none";
  }

  doLike(): void {
    this.toolService.showLoading('点赞中...');

    this.events.like(this.hb.id, null)
      .then(data => {
        this.hb.likes_count += 1;
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
      // if (this.pageNo <= this.totalPage) {
        this.events.getEventEarns(this.hb.id, this.pageNo, this.pageSize)
          .then(data => {
            if (this.pageNo === 1) {
              this.earns = data.data || data;
            } else {
              let temp = this.earns || [];
              this.earns = temp.concat(data.data || data);
            }

            this.totalPage = Math.floor((data.total + this.pageSize - 1) / this.pageSize);

            this.hasMore = this.totalPage > this.pageNo;
            resolve(data);
          })
          .catch(error => {
            reject(error);
          });
      // }
    });
    
  }

  doInfinite(e): void {
    if (this.pageNo < this.totalPage) {
      this.pageNo ++;

      this.loadEventEarns().then((data) => {
        e.complete();
      }).catch(error => {
        e.complete();
      });
    }
  }

  commit(): void {
    if (this.hb.rule_type === 'quiz' && this.answer === '') {
      this.toolService.showToast('必须选择一个答案');
      return;
    } 

    this.showGrabWall();
  }

  showGrabWall(): void {
    // let loc = `${this.position.lat},${this.position.lng}`;

    let payload;
    if (this.hb.rule_type === 'quiz') {
      let answers = this.hb.rule.answers;
      let answerOption = answers.indexOf(this.answer);
      payload = { hb: this.hb, answer: answerOption, location:  null };
    } else if ( this.hb.rule_type === 'checkin' ) {
      payload = { hb: this.hb, location:  null };
    }
    
    let modal = this.modalCtrl.create('HBWallPage', payload, {
      enableBackdropDismiss: false,
    });
    modal.present();
  }
}

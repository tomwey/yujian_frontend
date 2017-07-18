import { Component } from '@angular/core';
import { NavController,App } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
// import { RedPacketService } from '../../providers/red-packet-service';
import { EventsService } from '../../providers/events-service';
import { QQMaps } from '../../providers/qq-maps';
import { EventDetailPage } from "../event-detail/event-detail";
// import { HBDetailPage } from '../hb-detail/hb-detail';

// @IonicPage()
@Component({
  selector: 'page-explore',
  templateUrl: 'explore.html'
})
export class ExplorePage {

  hbData: any = [];
  pageNo: number = 1;
  totalPage: number = 1;
  pageSize: number = 30;
  eventsData: any = []; 
  hasMore: boolean = false;
  loadingMore: boolean = false;

  needsShowEmptyResult: boolean = false;

  constructor(public navCtrl: NavController,
              private toolService: ToolService,
              // private hbService: RedPacketService,
              private events: EventsService,
              private qqMaps: QQMaps,
              private app: App,
              ) {
      
  }

  ionViewDidLoad() {
    // this.reload();
    this.doRefresh(null);
  }

  doRefresh(refresher) {
    this.pageNo = 1;

    if (!refresher) {
      this.toolService.showLoading('拼命加载中...');
    }
    
    this.qqMaps.startLocating()
      .then(pos => {
        // this.startLoadEvents(pos.lat, pos.lng, refresher);
        this.loadEvents(pos)
          .then(data => {
            if (refresher) {
              refresher.complete();
            }
          });
      })
      .catch(error => {
        // this.startLoadEvents(0,0, refresher);
        this.loadEvents()
          .then(data => {
            if (refresher) {
              refresher.complete();
            }
        });
      });
  }

  hbStateInfo(hb): string {
    if (!hb) {
      return null;
    }

    if (hb.left_money <= 0.0) {
      return '红包已经被抢完了~'
    }

    // hb.grab_time ? hb.grab_time + ' 开抢' : '抢红包进行中'
    if (hb.grab_time && hb.grab_time.length > 0) {
      return `${hb.grab_time} 开抢`;
    }

    if (hb.grabed) {
      return '分享继续抢红包';
    }

    return '抢红包进行中';
  }

  private loadEvents(pos: any = { lat: 0, lng: 0 }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.events.list(pos.lat, pos.lng, this.pageNo, this.pageSize)
        .then(data => {
          if (this.pageNo === 1) {
            this.eventsData = data.data || data;

            this.needsShowEmptyResult = this.eventsData.length === 0;
          } else {
            let temp = this.eventsData || [];
            this.eventsData = temp.concat(data.data || data);
          }
          // console.log(data.data);
          this.totalPage = Math.floor(( data.total + this.pageSize - 1 ) / this.pageSize);
          this.hasMore = this.totalPage > this.pageNo;

          this.toolService.hideLoading();

          resolve(true);
        })
        .catch(error => {
          // reject(error);
          resolve(false);

          setTimeout(() => {
            this.toolService.showToast(error);
          }, 20);
        });
    });
  }

  gotoDetail(event) {
    // console.log(event);
    // this.navCtrl.push('EventDetailPage', event);
    this.navCtrl.push(EventDetailPage, event);
  }

  gotoNewEvent() {
    if (this.app.getRootNav() && this.app.getRootNav().getActiveChildNav())
      this.app.getRootNav().getActiveChildNav().select(2);
  }

  doInfinite(infiniteScroll): void {
    if (this.pageNo < this.totalPage) {
      this.pageNo ++;
      // this.loadingMore = true;
      console.log('loading more');
      this.qqMaps.startLocating()
        .then(pos => {
          // this.startLoadEvents(pos.lat, pos.lng, infiniteScroll);
          this.loadEvents(pos)
            .then(data => {
              infiniteScroll.complete();
            });
        })
        .catch(error => {
          // this.startLoadEvents(0,0, infiniteScroll);
          this.loadEvents()
            .then(data => {
              infiniteScroll.complete();
            });
        });
    } 
  }

}

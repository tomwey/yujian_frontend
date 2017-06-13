import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
// import { RedPacketService } from '../../providers/red-packet-service';
import { EventsService } from '../../providers/events-service';
import { QQMaps } from '../../providers/qq-maps';
// import { HBDetailPage } from '../hb-detail/hb-detail';

@IonicPage()
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

  constructor(public navCtrl: NavController,
              private toolService: ToolService,
              // private hbService: RedPacketService,
              private events: EventsService,
              private qqMaps: QQMaps
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

  private loadEvents(pos: any = { lat: 0, lng: 0 }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.events.list(pos.lat, pos.lng, this.pageNo, this.pageSize)
        .then(data => {
          if (this.pageNo === 1) {
            this.eventsData = data.data || data;
          } else {
            let temp = this.eventsData || [];
            this.eventsData = temp.concat(data.data || data);
          }
          console.log(data.data);
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
    this.navCtrl.push('EventDetailPage', event);
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

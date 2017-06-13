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
  totalPage: number = 0;
  pageSize: number = 8;
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
        this.startLoadEvents(pos.lat, pos.lng, refresher);
      })
      .catch(error => {
        this.startLoadEvents(0,0, refresher);
      });
  }

  startLoadEvents(lat, lng, refresher) {
      this.events.list(lat,lng,this.pageNo, this.pageSize)
      .then(data => {

        if (this.pageNo === 1) {
          this.eventsData = data.data || data;
        } else {
          let temp = this.eventsData || [];
          // temp.concat(data.data || data);
          this.eventsData = temp.concat(data.data || data);
        }
        
        // console.log(data);
        console.log(`page: ${this.pageNo}, array: ${this.eventsData}`);
        
        this.totalPage = Math.floor(( data.total + this.pageSize - 1 ) / this.pageSize);
        // console.log(this.totalPage);
        // console.log(this.hasMore);
        this.toolService.hideLoading();
        if (refresher) {
          // setTimeout( ()=>{
            refresher.complete();
          // }, 200);
        }

        this.hasMore = this.totalPage > this.pageNo;

        this.loadingMore = false;
      }).catch(error => {
        this.loadingMore = false;

        this.toolService.hideLoading();
        if (refresher) {
          // setTimeout( ()=>{
            refresher.complete();
          // }, 200);
          // refresher.complete();
        }

        setTimeout(() => {
          this.toolService.showToast(error);
        }, 20);
      });
  }

  gotoDetail(event) {
    // console.log(event);
    this.navCtrl.push('EventDetailPage', event);
  }

  doInfinite(infiniteScroll): void {
    if (!this.loadingMore && this.pageNo < this.totalPage) {
      this.pageNo ++;
      this.loadingMore = true;
      console.log('loading more');
      this.qqMaps.startLocating()
        .then(pos => {
          this.startLoadEvents(pos.lat, pos.lng, infiniteScroll);
        })
        .catch(error => {
          this.startLoadEvents(0,0, infiniteScroll);
        });
    }
  }

}

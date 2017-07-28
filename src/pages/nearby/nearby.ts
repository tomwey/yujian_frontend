import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, App, Content } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { QQMaps } from '../../providers/qq-maps';
import { EventsService } from '../../providers/events-service';
// import { BannersService } from '../../providers/banners-service';
import { UserService } from '../../providers/user-service';

import { EventDetailPage } from "../event-detail/event-detail";

// @IonicPage()
@Component({
  selector: 'page-nearby',
  templateUrl: 'nearby.html'
})
export class NearbyPage {
  
  @ViewChild(Content) content: Content;

  hbData:  any = [];
  token: string = null;
  position: any = null;
  
  errorOrEmptyMessage: string = '暂无数据';

  needShowEmptyResult: boolean = false;
  
  constructor(public navCtrl: NavController, 
              private events: EventsService,
              // private banners: BannersService,
              private qqMaps: QQMaps,
              private platform: Platform,
              private toolService: ToolService,
              private users: UserService,
              private app: App,
              ) 
  {

  }

  ionViewDidLoad() {

    if (this.platform.is('mobileweb') && this.platform.is('ios')) {
      this.content.enableJsScroll();
    }
    // this.reload();
    this.doRefresh(null);
  }

  refresh() {
    this.doRefresh(null);
  }

  doRefresh(refresher) {
    // this.pageNo = 1;

    if (!refresher) {
      this.toolService.showLoading('拼命加载中...');
    }
    
    this.qqMaps.startLocating(true)
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
        this.errorOrEmptyMessage = '获取位置失败，请重试！';

        this.needShowEmptyResult = true;
        // this.startLoadEvents(0,0, refresher);
        // this.loadEvents()
        //   .then(data => {
        //     if (refresher) {
        //       refresher.complete();
        //     }
        // });
      });
  }

  calcuDistance(distance): string {
    if (distance < 1000) {
      return `${Math.floor(distance)}米`;
    }

    let dist = (distance / 1000.0).toFixed(2);
    return `${dist}千米`;
  }

  private loadEvents(pos: any = { lat: 0, lng: 0 }): Promise<any> {
    return new Promise((resolve, reject) => {
      this.events.nearby(pos.lat,pos.lng)
        .then(data => {
          this.hbData = data;

          // if (this.pageNo === 1) {
          //   this.eventsData = data.data || data;

            this.needShowEmptyResult = this.hbData.length === 0;
          // } else {
          //   let temp = this.eventsData || [];
          //   this.eventsData = temp.concat(data.data || data);
          // }
          // console.log(data.data);
          // this.totalPage = Math.floor(( data.total + this.pageSize - 1 ) / this.pageSize);
          // this.hasMore = this.totalPage > this.pageNo;

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

}

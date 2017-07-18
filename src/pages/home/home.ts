import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Slides, App } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { QQMaps } from '../../providers/qq-maps';
import { EventsService } from '../../providers/events-service';
import { BannersService } from '../../providers/banners-service';
import { UserService } from '../../providers/user-service';

import { EventDetailPage } from "../event-detail/event-detail";

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild(Slides) slides: Slides;

  bannersData: any = [];
  hbData:  any = [];

  token: string = null;
  position: any = null;

  needShowEmptyResult: boolean = false;
  
  constructor(public navCtrl: NavController, 
              private events: EventsService,
              private banners: BannersService,
              private qqMaps: QQMaps,
              private platform: Platform,
              private toolService: ToolService,
              private users: UserService,
              private app: App,
              ) 
  {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // this.startLocation();
      this.loadData(null);
    });
  }

  gotoNewEvent() {
    if (this.app.getRootNav() && this.app.getRootNav().getActiveChildNav())
      this.app.getRootNav().getActiveChildNav().select(2);
  }

  ionViewDidEnter() {  
    // console.log(this.slides);
    if (this.slides) {
      // this.slides.loop = true;
      this.slides.startAutoplay();
    }
      
  }  
  
  //页面离开时停止自动播放  
  ionViewDidLeave() {   
    if (this.slides)
      this.slides.stopAutoplay();  
  }

  doRefresh(refresher) {
    if (this.slides) {
      this.slides.stopAutoplay();
    }

    this.loadData(refresher);
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

  loadData(refresher) {

    if (!refresher)
      this.toolService.showLoading('拼命加载中...');

    let promises: any[] = [];
    promises.push(this.users.token().then(token => this.token = token));
    promises.push(this.qqMaps.startLocating(true).then(pos => this.position = pos).catch(error => {}));

    Promise.all(promises)
      .then(() => {
        // console.log(this.token);
        // console.log(this.position);
        this._loadBannersAndEvents(refresher);
      })
      .catch((error) => {
        // console.log(error);
        this._loadBannersAndEvents(refresher);
      });
  }

  gotoDetail(hb): void {
    // this.navCtrl.push('EventDetailPage', hb);
    this.navCtrl.push(EventDetailPage, hb);
  }

  openBanner(banner) {
    if (banner.event) {
      this.gotoDetail(banner.event);
    }

    if (banner.ad) {
      this.navCtrl.push('CommWeb', { slug: banner.ad.slug, title: banner.ad.title });
    }

    if (banner.link && banner.link.length != 0) {
      // console.log('link');
      window.location.href = banner.link;
    }
  }

  slideDidChange(): void {
    // console.log(this.slides.getActiveIndex());
  }

  private _loadBannersAndEvents(refresher) {
    let promises: any[] = [];
    
    let loc = null;
    if (this.position) {
      loc = `${this.position.lng},${this.position.lat}`;
    }

    if (!refresher) {
      promises.push(this.banners.getBanners(this.token, loc)
      .then(data => this.bannersData = data).catch());
    }

    promises.push(this.events.latest(this.token, loc)
      .then(data => this.hbData = data).catch());

    Promise.all(promises)
      .then(() => {
        this.toolService.hideLoading();
        // console.log(this.eventsData);
        if (this.slides) {
          this.slides.autoplayDisableOnInteraction = false;
          
          this.slides.update();

          this.slides.startAutoplay();

          this.slides.slideTo(0, 300);
        }

        this.needShowEmptyResult = (this.hbData.length === 0);

        if (refresher) {
          refresher.complete();
        }

      }).catch((error) => {
        if (refresher) {
          refresher.complete();
        }

        this.toolService.hideLoading();

      });
  }

}

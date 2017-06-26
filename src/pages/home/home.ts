import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Slides } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { QQMaps } from '../../providers/qq-maps';
import { EventsService } from '../../providers/events-service';
import { BannersService } from '../../providers/banners-service';
import { UserService } from '../../providers/user-service';

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild(Slides) slides: Slides;

  bannersData: any = [];
  eventsData:  any = [];

  token: string = null;
  position: any = null;
  
  constructor(public navCtrl: NavController, 
              private events: EventsService,
              private banners: BannersService,
              private qqMaps: QQMaps,
              private platform: Platform,
              private toolService: ToolService,
              private users: UserService
              ) 
  {

  }

  ionViewDidLoad() {
    this.platform.ready().then(() => {
      // this.startLocation();
      this.loadData(null);
    });
  }

  ionViewDidEnter() {  
    // console.log(this.slides);
    if (this.slides) 
      this.slides.startAutoplay();
  }  
  
  //页面离开时停止自动播放  
  ionViewDidLeave() {   
    if (this.slides)
      this.slides.stopAutoplay();  
  }

  doRefresh(refresher) {
    this.loadData(refresher);
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

  gotoDetail(event): void {
    this.navCtrl.push('EventDetailPage', event);
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

    promises.push(this.events.latest(this.token, loc)
      .then(data => this.eventsData = data).catch());
    promises.push(this.banners.getBanners(this.token, loc)
      .then(data => this.bannersData = data).catch());

    Promise.all(promises)
      .then(() => {
        this.toolService.hideLoading();

        if (this.slides) {
          this.slides.autoplayDisableOnInteraction = false;
          this.slides.update();
        }

        if (refresher) {
          refresher.complete();
        }
        // console.log(this.bannersData);
        // console.log(this.eventsData);

      }).catch((error) => {
        if (refresher) {
          refresher.complete();
        }

        this.toolService.hideLoading();
        setTimeout(() => {
          this.toolService.showToast('加载出错了，请重试！');
        }, 200);
      });
  }

}

import { Component, ViewChild } from '@angular/core';
import { NavController, Platform, Slides, App } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
// import { QQMaps } from '../../providers/qq-maps';
import { LocationService } from "../../providers/location-service";
// import { EventsService } from '../../providers/events-service';
import { PartinsService } from "../../providers/partins-service";
import { BannersService } from '../../providers/banners-service';
import { UserService } from '../../providers/user-service';
import { SplashScreen } from '@ionic-native/splash-screen';

// import { EventDetailPage } from "../event-detail/event-detail";
import { PartinDetailPage } from '../partin-detail/partin-detail';

// @IonicPage()
@Component({
  selector: 'page-home-explore',
  templateUrl: 'home-explore.html'
})
export class HomeExplorePage {
  
  @ViewChild(Slides) slides: Slides;
  // @ViewChild(Content) content: Content;

  bannersData: any = [];
  hbData:  any = [];

  token: string = null;
  position: any = null;

  needShowEmptyResult: boolean = false;

  hasHideSplash: boolean = false;
  
  constructor(public navCtrl: NavController, 
              // private events: EventsService,
              private partins: PartinsService,
              private banners: BannersService,
              // private qqMaps: QQMaps,
              private locService: LocationService,
              private platform: Platform,
              private toolService: ToolService,
              private users: UserService,
              private app: App,
              private splashScreen: SplashScreen,
              ) 
  {

  }

  ionViewDidLoad() {
    // if (this.platform.is('mobileweb') && this.platform.is('ios')) {
    //   this.content.enableJsScroll();
    // }

    this.platform.ready().then(() => {
      // this.startLocation();
      this.loadData(null);

      // this.users.checkVersion();

    });
  }

  // gotoNewEvent() {
  //   if (this.app.getRootNav() && this.app.getRootNav().getActiveChildNav())
  //     this.app.getRootNav().getActiveChildNav().select(2);
  // }

  ionViewDidEnter() {  
    // console.log(this.slides);
    this.app.setTitle('小优大惠');

    if (!this.hasHideSplash) {
      this.hasHideSplash = true;
      this.splashScreen.hide();
    }
    
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

  // doRefresh(refresher) {
  //   if (this.slides) {
  //     this.slides.stopAutoplay();
  //   }

  //   this.loadData(refresher);
  // }

  refresh() {
    this.loadData(null);
  }

  loadData(refresher) {

    if (!refresher)
      this.toolService.showLoading('拼命加载中...');

    let promises: any[] = [];
    promises.push(this.users.token().then(token => this.token = token));
    promises.push(this.locService.getUserPosition().then(pos => this.position = pos)
                  .catch(error => {}));

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
    this.app.getRootNavs()[0].push(PartinDetailPage, hb);
  }

  openBanner(banner) {
    if (banner.partin) {
      this.gotoDetail(banner.partin);
    }

    if (banner.ad) {
      this.app.getRootNavs()[0].push('CommWeb', { slug: banner.ad.slug, title: banner.ad.title });
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

    promises.push(this.partins.explore(loc)
      .then(data => {
        this.hbData = data ;
        this.needShowEmptyResult = (this.hbData.length === 0);

      }).catch(error => {
        
      }));

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

        // console.log('ssssssssss');

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

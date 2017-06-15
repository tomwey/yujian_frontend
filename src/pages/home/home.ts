import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController, IonicPage } from 'ionic-angular';
import { ToolService } from '../../providers/tool-service';
import { QQMaps } from '../../providers/qq-maps';
import { Platform } from 'ionic-angular';
import { EventsService } from '../../providers/events-service';
import { UserService } from '../../providers/user-service';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any = null;
  hbCount: number = 0; // 红包数量
  mapLoaded: boolean = false; // 地图是否已经加载

  loadedMarkers: any[] = []; // 保存已经添加的标记
  hbIsLoading: boolean = false; // 是否正在加载红包
  mapError: any = null;
  constructor(public navCtrl: NavController, 
              private events: EventsService,
              private qqMaps: QQMaps,
              private platform: Platform,
              private toolService: ToolService,
              private users: UserService,
              private modalCtrl: ModalController,
              private utils: UtilsServiceProvider) 
  {
    // this.scriptLoader.load('qqLoc', 'qqMap').then(data => {
    //   console.log(qq.maps);
    //   // console.log(data);
    //   // this.startLocation().then
    // }).catch(error => {
    //   console.log(error);
    // });
  }

  doTest() {
    this.navCtrl.push('CommWeb', { slug: 'about', title: '关于' });
  }

  ionViewDidLoad() {
    document.addEventListener('hb:click', (e) => {
      this.navCtrl.push('EventDetailPage', e['detail']);
      // this.app.getRootNav().push('EventDetailPage', e['detail']);
      // console.log(this.navCtrl);
      // console.log(this.app.getRootNav());
    });
    document.addEventListener('map:drag', (e) => {
      // console.log('开始加载数据...');
      this.map && this.loadHBData(this.map.getCenter());
    });

    this.platform.ready().then(() => {

      this.startLocation();
      // this.initMap();
      // this.qqMaps.initSDK().then(() => {
      //   this.startLocation();
      // }).catch(error => {
      //   console.log(error);
      // });
      
      // this.locationService.startLocation();
    });
  }

  fetchUserLocation(): void {
    this.mapError = null;

    this.toolService.showLoading('获取位置中...');

    this.users.loadUser()
      .then(user => {
        this.toolService.hideLoading();

        console.log(user);
        if (!user.current_location) {
          this.mapError = { code: -1, message: '位置获取失败或未开启定位！' };
          return;
        }
        // 初始化地图
        let arr = user.current_location.split(',');
        let pos = { lat: arr[0], lng: arr[1] };
        if (this.map) {
          this.map.panTo(new qq.maps.LatLng(pos.lat,pos.lng));
        } else {
          // console.log('开始初始化地图');
          this.initMap(pos);
        }
      }).catch(error => {
        this.toolService.hideLoading();

        // setTimeout(() => {
          this.mapError = error;
          // this.toolService.showToast('位置获取失败!')
        // }, 200);
      });
  }

  startLocation(): void {
    this.toolService.showLoading('定位中...');
    
    this.mapError = null;

    // this.fetchUserLocation();
    this.qqMaps.startLocating(true)
      .then(pos => {
        // console.log(pos);
        this.toolService.hideLoading();

        if (this.map) {
          this.map.panTo(new qq.maps.LatLng(pos.lat,pos.lng));
          this.loadHBData(pos);
        } else {
          // console.log('开始初始化地图');
          setTimeout(() => {
            this.initMap(pos);
          }, 0);
        }
      })
      .catch(error => {
        // console.log(error);
        this.toolService.hideLoading();
        this.mapError = '位置获取失败或未开启定位！';
      });
  }

  // 初始化地图
  initMap(pos) {
    console.log('ddddd');
    this.toolService.showLoading('地图加载中...');
    this.qqMaps.init(this.mapElement.nativeElement, null)
      .then((map) => {
        // console.log('123333');
        this.toolService.hideLoading();

        this.map = map;
        this.mapLoaded = true;

        console.log(`lat:${pos.lat},lng:${pos.lng}`);

        this.map.panTo(new qq.maps.LatLng(pos.lat,pos.lng));

        this.loadHBData(pos);
      })
      .catch(error => {
        // console.log(error);
        this.toolService.hideLoading();

        setTimeout(() => {
          this.toolService.showToast(error.message || error);
        }, 100);
      });
  }

  loadHBData(pos) {
    setTimeout(() => {
      this.loadData(pos);
    }, 100);
  }

  // 加载附近红包
  loadData(pos) {
    this.hbIsLoading = true;

    // 清空所有的标记
    this.loadedMarkers.forEach(marker => {
      marker.setMap(null);
    });
    this.loadedMarkers = [];

    // let position = this.map.getCenter();
    this.events.nearby(pos.lat, pos.lng)
      .then(data => {
        console.log(data);
        
        this.hbCount = data.length;

        this.hbIsLoading = false;

        // this.addMarkers(data);
      })
      .catch(error => { 
        console.log(error);
        this.hbIsLoading = false;
      });
  }

  // 添加红包到地图上
  addMarkers(data) {
    data.forEach(item => {
      if (this.loadedMarkers) {
        this.loadedMarkers.push(this.qqMaps.addMarker(item));
      }
    });
  }

}

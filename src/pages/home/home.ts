import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
// import { RedPacketService } from '../../providers/red-packet-service';
import { ToolService } from '../../providers/tool-service';
// import { HBDetailPage } from '../hb-detail/hb-detail';
import { QQMaps } from '../../providers/qq-maps';
import { Platform } from 'ionic-angular';
import { EventsService } from '../../providers/events-service';
import { UserService } from '../../providers/user-service';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
// import { ScriptLoadProvider } from '../../providers/script-load/script-load';
// import { LocationProvider } from '../../providers/location/location';

// @IonicPage()
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
              // private hbService: RedPacketService,
              // private mapService: MapService,
              // private locationService: LocationService,
              // private geolocation: Geolocation,
              private events: EventsService,
              private qqMaps: QQMaps,
              private platform: Platform,
              private toolService: ToolService,
              // private location: LocationProvider,
              private users: UserService,
              private modalCtrl: ModalController,
              private utils: UtilsServiceProvider) 
  {
    // this.scriptLoad.load('qqLoc', 'qqMap').then(data => {
    //   console.log(data);
    // });
    // this.startLocation();      
    // console.log(wx); 
    // this.fetchUserLocation();  
    // this.utils.getWXConfig('home_sign_url')
    //   .then(data => {
    //     // console.log(data);
    //     wx.config(data);
    //     wx.ready(() => {
    //       console.log('ready...');
    //       wx.getLocation({
    //         type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    //         success:  (res) => {
    //           let lat = res.latitude; // 纬度，浮点数，范围为90 ~ -90
    //           let lng = res.longitude; // 经度，浮点数，范围为180 ~ -180。
    //           let speed = res.speed; // 速度，以米/每秒计
    //           let accuracy = res.accuracy; // 位置精度
    //           console.log(`lat:${lat},lng:${lng},speed:${speed},accuracy:${accuracy}`);
    //         }
    //       });
    //     });
    //     wx.error(res => {
    //       console.log(`error:${res}`);
    //     });
    //   }).catch(error=>{
    //     console.log(error);
    //   });
  }

  ionViewDidLoad() {
    document.addEventListener('hb:click', (e) => {
      // console.log(e);
      // this.navCtrl.push(HBDetailPage, { item: e['detail'] });
      this.navCtrl.push('EventDetailPage', e['detail']);
    });
    document.addEventListener('map:drag', (e) => {
      // console.log('dddddddd');
      this.loadHBData();
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
          // this.loadHBData();
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
    this.qqMaps.startLocating()
      .then(pos => {
        // console.log(pos);
        this.toolService.hideLoading();

        if (this.map) {
          this.map.panTo(new qq.maps.LatLng(pos.lat,pos.lng));
          // this.loadHBData();
        } else {
          // console.log('开始初始化地图');
          this.initMap(pos);
        }

      })
      .catch(error => {
        // console.log(error);
        this.toolService.hideLoading();
        this.mapError = '位置获取失败!';
      });
  }

  // 初始化地图
  initMap(pos) {
    this.qqMaps.init(this.mapElement.nativeElement, null)
      .then((map) => {
        // console.log('123333');
        this.map = map;
        this.mapLoaded = true;
        this.toolService.hideLoading();

        this.map.panTo(new qq.maps.LatLng(pos.lat,pos.lng));

        // this.loadHBData();
      })
      .catch(error => {
        console.log(error);
        // this.toolService.hideLoading();
      });
  }
  // 重新定位到当前位置
  // relocate() {
  //   this.qqMaps.startLocating().then(position => {
  //     this.map.panTo(new qq.maps.LatLng(position.lat,position.lng));

  //     // 重新获取数据
  //     this.loadHBData();
  //   }).catch(error => {

  //   })
  // }

  loadHBData() {
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  // 加载附近红包
  loadData() {
    this.hbIsLoading = true;

    // 清空所有的标记
    this.loadedMarkers.forEach(marker => {
      marker.setMap(null);
    });
    this.loadedMarkers = [];

    let position = this.map.getCenter();
    this.events.nearby(position.lat, position.lng)
      .then(data => {
        console.log(data);
        
        this.hbCount = data.length;

        this.hbIsLoading = false;

        this.addMarkers(data);
      })
      .catch(error => { 
        console.log(error);
        this.hbIsLoading = false;
      });
  }

  // 添加红包到地图上
  addMarkers(data) {
    data.forEach(item => {
      this.loadedMarkers.push(this.qqMaps.addMarker(item));
    });
  }

}

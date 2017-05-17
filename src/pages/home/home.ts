import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
// import { RedPacketService } from '../../providers/red-packet-service';
import { ToolService } from '../../providers/tool-service';
// import { HBDetailPage } from '../hb-detail/hb-detail';
import { QQMaps } from '../../providers/qq-maps';
import { Platform } from 'ionic-angular';
import { EventsService } from '../../providers/events-service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  hbCount: number = 0; // 红包数量
  mapLoaded: boolean = false; // 地图是否已经加载

  loadedMarkers: any[] = []; // 保存已经添加的标记
  hbIsLoading: boolean = false; // 是否正在加载红包

  constructor(public navCtrl: NavController, 
              // private hbService: RedPacketService,
              // private mapService: MapService,
              // private locationService: LocationService,
              // private geolocation: Geolocation,
              private events: EventsService,
              private qqMaps: QQMaps,
              private platform: Platform,
              private toolService: ToolService) 
  {
    // this.startLocation();             
  }

  ionViewDidLoad() {
    document.addEventListener('hb:click', (e) => {
      // console.log(e);
      // this.navCtrl.push(HBDetailPage, { item: e['detail'] });
      this.navCtrl.push('EventDetailPage', e['detail']);
    });
    document.addEventListener('map:drag', (e) => {
      this.loadHBData();
    });

    this.platform.ready().then(() => {
      this.qqMaps.init(this.mapElement.nativeElement, null).then(map => {
        this.map = map;

        this.mapLoaded = true;

        this.loadHBData();

      }).catch(error => {
        console.log(error);
      });
    });
  }

  // 重新定位到当前位置
  relocate() {
    this.qqMaps.startLocating().then(position => {
      // 更新地图的中心点
      this.map.panTo(position);

      // 重新获取数据
      this.loadHBData();
    });
  }

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

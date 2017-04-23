import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RedPacketService } from '../../providers/red-packet-service';
import { MapService } from '../../providers/map-service';
import { LocationService } from '../../providers/location-service';
import { ToolService } from '../../providers/tool-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, 
              private hbService: RedPacketService,
              private mapService: MapService,
              private locationService: LocationService,
              private toolService: ToolService) {

  }

  ionViewDidLoad() {
    this.startLocation();
  }

  startLocation() {
    // console.log('开始定位中...');
    this.toolService.showLoading('开始定位中...');
    this.locationService.getPosition().then(position => {
      this.toolService.hideLoading();
      // this.toolService.showToast('定位成功：' + position.lat + ', ' + position.lng, 20000);
      // console.log('定位成功：' + position.lat + ', ' + position.lng);
      this.showMap(position);
    }).catch(error => {
      console.log('定位失败：' + error);
      this.toolService.hideLoading();
      this.toolService.showToast('定位失败');
    });
  }

  showMap(position): void {
    this.toolService.showLoading('地图加载中...');
    this.mapService.createQQMap(this.mapElement.nativeElement, position)
      .then(map => {
        this.map = map;

        this.toolService.hideLoading();

        this.addCustomControl();
        this.addCurrentPositionMarker(position);
      })
      .catch(error => {

        this.toolService.hideLoading();
        this.toolService.showToast(error);
      });
  }

  addCurrentPositionMarker(position): void {
    let gpsLatLng = new qq.maps.LatLng(position.lat,position.lng);

     qq.maps.convertor.translate(gpsLatLng, 1, (res) => {
      let marker = new qq.maps.Marker({
        position: res[0],
        map: this.map,
      });
      
      var anchor = new qq.maps.Point(0, 0),
         size = new qq.maps.Size(30, 30),
         origin = new qq.maps.Point(0, 0),
         markerIcon = new qq.maps.MarkerImage(
     "http://ionicframework.com/img/finger.png",
      size, 
      origin,
      anchor
      );
      marker.setIcon(markerIcon);

    });
  }

  addCustomControl(): void {
    new qq.maps.Control(
      {
        content: '<h2>刷新</h2>',
        align: qq.maps.ALIGN.BOTTOM_LEFT,
        map: this.map
      }
    );
  }

  loadHongbao(lat, lng) {
    // console.log(lat + ', ' + lng);

    this.hbService.nearby(lat, lng).then(data => {
      console.log(data);
      for (let item of data) {
        let latLng = new qq.maps.LatLng(item.lat, item.lng);
        new qq.maps.Marker({
          position: latLng,
          map: this.map
        })
      }
    }, err => {
      console.log(err);
    });
  }

}

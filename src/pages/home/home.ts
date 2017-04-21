import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var qq;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {

  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true }).then((position) => {
      console.log(position);
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      let gpsLatLng = new qq.maps.LatLng(lat,lng);
      
      // this.showMap(gpsLatLng);
      // HTML5 定位纠偏
      qq.maps.convertor.translate(gpsLatLng, 1, (res) => {
        this.showMap(new qq.maps.LatLng(res[0].lat, res[0].lng));
        console.log(res[0]);
      });
    }, err => {
      console.log(err);
    });
  }

  showMap(latLng) {
    let mapOptions = {
        center: latLng,
        zoom: 20 ,
        mapTypeId: qq.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
    }

    this.map = new qq.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new qq.maps.Marker({
          position: latLng,
          map: this.map
    });

    // 添加自定义控件
    let customZoomDiv = document.createElement("div");
    customZoomDiv.style.cssText = "padding:5px;border:2px solid #86acf2;background:#ffffff";
    this.map.controls[qq.maps.ControlPosition.LEFT_BOTTOM].push(customZoomDiv);
  }

}

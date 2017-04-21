import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { RedPacketService } from '../../providers/red-packet-service';
import { MapService } from '../../providers/map-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  constructor(public navCtrl: NavController, 
              public geolocation: Geolocation,
              private hbService: RedPacketService,
              private mapService: MapService) {

  }

  ionViewDidLoad() {
    this.geolocation.getCurrentPosition().then(position => {
      console.log(position.coords.latitude + ', ' + position.coords.longitude);
      this.mapService.createMap(this.mapElement.nativeElement, 
        { lat:  position.coords.latitude,
          lng: position.coords.longitude
        } )
      .then(map => {
        this.map = map;
      }, error => {

      });
    });
    
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

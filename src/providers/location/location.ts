import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';

/*
  Generated class for the LocationProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationProvider {

  constructor() {
    // console.log('Hello LocationProvider Provider');
  }

  startUpdatingLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof qq == "undefined" || typeof qq.maps == "undefined") {
        console.log("QQ Geolocation JavaScript SDK needs to be loaded.");

        window['init'] = () => {
          // console.log(qq.maps.Geolocation);
          this.getCurrentPosition()
            .then(pos=>resolve(pos))
            .catch(error=>reject(error));
        };

        let script = document.createElement("script");
        script.id = "qqGeolocation";
        script.src = "https://apis.map.qq.com/tools/geolocation/min?key=EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ&referer=yujian&callback=init";
        script.async = true;

        document.body.appendChild(script);
      } else {
        console.log('has loaded');
        this.getCurrentPosition()
            .then(pos=>resolve(pos))
            .catch(error=>reject(error));
      }
    });
  }

  private 
  getCurrentPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      let geolocation = new qq.maps.Geolocation();
          geolocation.getLocation((pos) => {
            console.log(`pos:${pos.lat},${pos.lng}`);
            resolve(pos);
          }, (error) => {
            console.log(`e->pos:${error}`);
            reject(error);
          }, { timeout: 9000 });
    });
  }

}

import { Injectable } from '@angular/core';

/*
  Generated class for the LocationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationService {

  constructor() {
    // console.log('Hello LocationService Provider');
  }

  /**
   * 获取HTML5位置坐标
   * @returns {Promise}
   */
  public startLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof qq == "undefined" || typeof qq.maps == "undefined") {
        console.log("QQ maps JavaScript needs to be loaded.");

        window['init'] = () => {
          console.log(qq.maps.Geolocation);
        };

        let script = document.createElement("script");
        script.id = "qqGeolocation";
        script.src = "https://apis.map.qq.com/tools/geolocation/min?key=EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ&referer=yujian&callback=init";
        script.async = true;

        document.body.appendChild(script);
      } else {
        console.log('has loaded');
      }
    });
  }
}

import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

/*
  Generated class for the LocationService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationService {

  constructor(private geolocation: Geolocation,) {
    // console.log('Hello LocationService Provider');
  }

  /**
   * 获取HTML5位置坐标
   * @returns {Promise}
   */
  public getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.geolocation.getCurrentPosition()
        .then(position => {
          resolve({ lat: position.coords.latitude,
                    lng: position.coords.longitude 
                  });
        })
        .catch(error => {
        reject(error);
        });
    });
  }
}

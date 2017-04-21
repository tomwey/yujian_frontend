import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
/*
  Generated class for the MapService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MapService {

  private map: any;

  constructor() {
    // console.log('Hello MapService Provider');
  }

  /**
   * 加载js, 动态创建dom到页面
   * @returns { Promise }
   */
  private loadMapAPI(): Promise<any> {
    console.log('开始加载地图API');

    const _loadScript = () => {
      // <script charset="utf-8" src="http://webapi.amap.com/maps?v=1.3&key=023be450092b8590759a23775a77d9bb"></script>
      const script = document.createElement('script');
      script.src   = 'http://map.qq.com/api/js?v=2.exp&key=EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ&libraries=convertor&callback=initMap';
      script.type  = 'text/javascript';
      script.charset = 'utf-8';
      script.async   = true;
      const s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(script, s);
    };

    return new Promise((resolve) => {
      (<any>window).initMap = () => {
        console.log('地图API初始化成功');
        return resolve();
      };

      _loadScript();
    });
  } // end loadMapAPI

  /**
   * 异步加载地图
   * @returns {Promise}
   */
  private loadMap(): Promise<any> {
    console.log('异步开始加载地图');
    return new Promise( (resolve, reject) => {
      if ( (<any>window).qq ) {
        resolve();
      } else {
        this.loadMapAPI().then(() => resolve()).catch(error => {
          reject(error);
        });
      }
    });
  } // end loadMap()

  /**
   * 创建地图
   * @returns {Promise}
   */
  public createMap(el, position): Promise<any> {

    return new Promise((resolve, reject) => {
      this.loadMap().then(() => {
        console.log('地图加载成功');
        let gpsLatLng = new qq.maps.LatLng(position.lat,position.lng);

        qq.maps.convertor.translate(gpsLatLng, 1, (res) => {
          let mapOptions = {
            center: res[0],
            zoom: 20,
            mapTypeId: qq.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
          };

          let map = new qq.maps.Map(el, mapOptions);
          this.map = map;
          resolve(this.map);
        });
      }).catch(error => {
        reject(error);
      });
    });
  }
}

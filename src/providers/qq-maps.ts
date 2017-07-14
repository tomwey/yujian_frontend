import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Events } from 'ionic-angular';

export interface MapError {
  code: number;
  message?: string;
}

// const APP_KEY  = "EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ";
// const APP_NAME = "yujian";

@Injectable()
export class QQMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;

  constructor(/*private geolocation: Geolocation*/private storage: Storage,
    private events: Events) {
      // console.log(`events:${events}`);
    // this.initSDK();
  }

  /**
   * 初始化地图
   * @param mapElement 
   * @param pleaseConnect 
   */
  init(mapElement: any, position: any): Promise<any> {
    this.mapElement = mapElement;
    // this.pleaseConnect = pleaseConnect;

    return this.initMap();
    // return this.loadQQMaps();
  }

  /**
   * 加载QQ地图
   */
  private loadQQMaps(): Promise<any> {
    return new Promise( (resolve,reject) => {
      if (typeof qq == "undefined" || typeof qq.maps == "undefined" || 
          typeof qq.maps.Map == "undefined") {
        console.log("QQ maps JavaScript needs to be loaded.");
        this.disableMap();

        window['mapInit'] = () => {
          resolve(true);

          // 注册拖动地图事件
          // console.log(qq.maps.event);
          // qq.maps.event.addListener(this.map, 'center_changed', () => {
          //   this.events.publish('map:drag');
          // });
        };

        let script = document.createElement("script");
        script.id = "qqMaps";
        script.src = "https://map.qq.com/api/js?v=2.exp&key=EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ&callback=mapInit";
        script.async = true;

        document.body.appendChild(script);
      } else {
        resolve(true);
      }
    } );
    
  } // end loadQQMaps() //30.668620，104.073605
  
  private loadQQLocSDK(): Promise<any> {
    return new Promise((resolve, reject) => {
      let sdkUrl = 'https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js';
      if (typeof qq == "undefined" || typeof qq.maps == "undefined" || 
          typeof qq.maps.Geolocation == "undefined") {
        console.log("QQ Geolocation JavaScript needs to be loaded.");

        let script = document.createElement("script");
        script.id = "qqLoc";
        script.src = sdkUrl;// + '&callback=locInit';
        // script.async = true;
        script.onerror = () => {
          reject(false);
        };
        script.onload = () => {
          console.log('加载loc sdk成功');
          resolve(true);
        };
        document.body.appendChild(script);
      } else {
        resolve(true);
      }
    });
  }

  /**
   * 获取位置，并进行HTML5纠偏
   * @param reload 是否强制重新获取位置
   * @returns {Promise}
   */
  startLocating(reload: boolean = false): Promise<any> {
    return new Promise((resolve, reject) => {
      if (reload) {
        this._loadPosition()
          .then(pos => {
            this._savePosition(pos);

            resolve(pos);
          })
          .catch(error => reject(error));
      } else {
        this.storage.get('currentPosition')
          .then(data => {
            if (!data) {
              resolve({ lat: 0, lng: 0, addr: '' });
            } else {
              console.log(data);
              resolve(JSON.parse(data));
            }
          })
          .catch(error => {
            console.log(error);
            reject(error);
          });
      }
    });
  }

  private _savePosition(pos): void {
    this.storage.set('currentPosition', JSON.stringify(pos))
      .then(data => {
        console.log('保存位置成功! ->: ' + data);
      })
      .catch(error => {
        console.log('保存位置失败: ' + error);
      });
  }

  private _loadPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.loadQQLocSDK()
        .then(data => {
          let geolocation = new qq.maps.Geolocation("EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ", "yujian");
          if (geolocation) {
            geolocation.getLocation((pos) => {
              console.log(`pos:${pos.lat},${pos.lng}`);
              resolve(pos);
            }, (error) => {
              console.log(`e->pos:${error}`);
              reject(error);
            }, { timeout: 9000 });
          } else {
            reject({code: -1, message: '定位SDK初始化失败'});
          }
        }).catch(error => {
          reject({code: -1, message: '定位SDK加载失败'});
        });
    });
  }

  /**
   * 创建地图
   */
  initMap(): Promise<any> {
    this.mapInitialised = true;
    if (this.map) {
      return new Promise((resolve, reject) => {
        resolve(this.map);
      });
    }

    return new Promise( (resolve, reject) => {
      this.loadQQMaps().then(() => {
        // 创建地图
        let center = new qq.maps.LatLng(30.668620,104.073605);
        let mapOptions = {
          center: center,
          zoom: 14,
          mapTypeId: qq.maps.MapTypeId.ROADMAP,
          disableDefaultUI: true,
          useNative: true,
        };
        let map = new qq.maps.Map(this.mapElement, mapOptions);
        if (map) {
          this.map = map;
          // console.log('ddddd123');
          // console.log('dddd--------123333');
          // 注册拖动地图事件
          qq.maps.event.addListener(this.map, 'center_changed', () => {
            // let event = new CustomEvent('map:drag');
            // document.dispatchEvent(event);
            // console.log('dddd--------');
            this.events.publish('map:drag');
          });

          // 回调上层接口
          resolve(this.map);
        } else {
          let mapError = { code: -2, message: '地图初始化失败' };
          reject(mapError);
        }
      }).catch(error =>{
        reject(error);
      });
    });
  } // end initMap

  markCurrentLocation(map, pos): any {
    // console.log('map: ' + map);
    let anchor = new qq.maps.Point(9,9);
    let size = new qq.maps.Size(18,18);
    let orgin = new qq.maps.Point(0,0);
    let markerIcon = new qq.maps.MarkerImage('../assets/images/icon_loc.svg',size, orgin, anchor
    );
    let marker = new qq.maps.Marker({
      icon: markerIcon,
      map: map,
      // animation:qq.maps.MarkerAnimation.DROP,
      position: new qq.maps.LatLng(pos.lat, pos.lng)
    });
    // console.log(`marker: ${marker}`);
    return marker;
  }

  // 添加标记
  addMarker(item, map, callback): any {
    let anchor = new qq.maps.Point(6,6);
    let size = new qq.maps.Size(35,39);
    let orgin = new qq.maps.Point(0,0);
    let markerIcon = new qq.maps.MarkerImage('../assets/images/icon_hb.svg',size, orgin, anchor
    );
    let marker = new qq.maps.Marker({
      icon: markerIcon,
      map: map,
      // animation:qq.maps.MarkerAnimation.DROP,
      position: new qq.maps.LatLng(item.lat, item.lng)
    });
    // 添加事件
    marker && qq.maps.event.addListener(marker, 'click', () => {
      if (callback) {
        callback(item);
      };
    });
    return marker;
  }

  disableMap(): void {
    console.log('disable map...');
  }

  enableMap(): void {
    console.log('enable map...');
  }

}

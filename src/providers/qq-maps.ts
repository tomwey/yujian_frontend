import { Injectable } from '@angular/core';
// import { Geolocation } from '@ionic-native/geolocation';

export interface MapError {
  code: number;
  message?: string;
}

const APP_KEY  = "EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ";
const APP_NAME = "yujian";

@Injectable()
export class QQMaps {

  mapElement: any;
  pleaseConnect: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;

  constructor(/*private geolocation: Geolocation*/) {
    // this.initSDK();
  }

  /**
   * 初始化QQ JS SDK
   */
  initSDK(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (typeof qq == "undefined" || typeof qq.maps == "undefined") {
        window['mapInit'] = () => {
          console.log('SDK加载成功');
          resolve(true);
        };

        // 加载定位SDK
        let geoScript = document.createElement("script");
        geoScript.id = "qqGeolocation";
        geoScript.src = "https://3gimg.qq.com/lightmap/components/geolocation/geolocation.min.js";
        // script.async = true;
        document.body.appendChild(geoScript);

        // 加载地图SDK
        let script = document.createElement("script");
        script.id = "qqMaps";
        script.src = `http://map.qq.com/api/js?v=2.exp&key=${APP_KEY}&callback=mapInit`;
        script.async = true;

        document.body.appendChild(script);
      } else {
        console.log('QQ Map JS SDK has loaded.');
        resolve(true);
      }
    });
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
   * 加载地图
   */
  /*loadQQMaps(): Promise<any> {
    return new Promise( (resolve,reject) => {
      if (typeof qq == "undefined" || typeof qq.maps == "undefined" || 
          typeof qq.maps.Map == "undefined") {
        console.log("QQ maps JavaScript needs to be loaded.");
        this.disableMap();

        window['mapInit'] = () => {
          this.initMap(position)
            .then((map) => {
            this.map = map;

            // 注册拖动地图事件
            qq.maps.event.addListener(this.map, 'center_changed', function() {
              var event = new CustomEvent('map:drag');
              document.dispatchEvent(event);
            });

            resolve(this.map);
            })
            .catch(error => {
              reject(error);
            });
          this.enableMap();
        };

        let script = document.createElement("script");
        script.id = "qqMaps";
        script.src = "http://map.qq.com/api/js?v=2.exp&key=EJZBZ-VCM34-QJ4UU-XUWNV-3G2HJ-DWBNJ&libraries=convertor&callback=mapInit";
        script.async = true;

        document.body.appendChild(script);
      } else {
        this.initMap(position).then(map => {
          resolve(this.map);
        }).catch(error => {
          reject(error);
        });
        this.enableMap();
      }
    } );
    
  } // end loadQQMaps() //30.668620，104.073605
*/
  /**
   * 获取位置，并进行HTML5纠偏
   * @returns {Promise}
   */
  startLocating(): Promise<any> {
    return new Promise((resolve, reject) => {
      if ( typeof qq.maps.Geolocation == "undefined" ) {
        reject({ code: -1, message: '定位SDK未加载成功' });
      } else {
        let geolocation = new qq.maps.Geolocation(APP_KEY, APP_NAME);
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
      }  
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
      // console.log('ddddd');
      // 默认设置地图为成都中心
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
        // 注册拖动地图事件
        qq.maps.event.addListener(this.map, 'center_changed', function() {
          let event = new CustomEvent('map:drag');
          document.dispatchEvent(event);
        });

        // 回调上层接口
        resolve(this.map);
      } else {
        let mapError = { code: -1, message: '地图初始化失败' };
        reject(mapError);
      }
    });
  } // end initMap

  // 添加标记
  addMarker(item): any {
    // 自定义一个覆盖物类
    function CustomOverlay(position, data) {
        this.data = data;
        this.position = position;
    }
    CustomOverlay.prototype = new qq.maps.Overlay();
    //定义construct,实现这个接口来初始化自定义的Dom元素
    CustomOverlay.prototype.construct = function() {
        var div = this.div = document.createElement("div");
        this.div.classList.add("hb-marker");
        // var divStyle = this.div.style;
        // divStyle.position = "absolute";
        // divStyle.width = "36px";
        // divStyle.height = "48px";
        // divStyle.background = "url(assets/images/map_img_hb.png) no-repeat center center";
        // // divStyle.border = "1px solid #000000";
        // divStyle.textAlign = "center";
        // // divStyle.lineHeight = "24px";
        // divStyle.borderRadius = "6px";
        // divStyle.cursor = "pointer";
        this.div.innerHTML = 
        '<div class="left-money">¥' + this.data.hb.left_money + '</div';
        //'<div class="user"><img src="' + this.data.owner.avatar + '"><span class="level level-'+ this.data.owner.type +'"></span></div>' + '<p class="digit">' + this.data.quantity + '</p>';
        // console.log('111111');
        // console.log(this.data);
        //将dom添加到覆盖物层
        var panes = this.getPanes();
        //设置panes的层级，overlayMouseTarget可接收点击事件
        panes.overlayMouseTarget.appendChild(div);
    
        var self = this;
        this.div.onclick = function() {
            // alert(self.index);
            // alert(self.data);
            var event = new CustomEvent('hb:click', { 'detail': self.data });
            document.dispatchEvent(event);
        }
    }

    //实现draw接口来绘制和更新自定义的dom元素
    CustomOverlay.prototype.draw = function() {
        var overlayProjection = this.getProjection();
        //返回覆盖物容器的相对像素坐标
        var pixel = overlayProjection.fromLatLngToDivPixel(this.position);
        var divStyle = this.div.style;
        divStyle.left = pixel.x - 12 + "px";
        divStyle.top = pixel.y - 12 + "px";
    }
    //实现destroy接口来删除自定义的Dom元素，此方法会在setMap(null)后被调用
    CustomOverlay.prototype.destroy = function() {
        this.div.onclick = null;
        this.div.parentNode.removeChild(this.div);
        this.div = null
    }

    let position = new qq.maps.LatLng(item.lat, item.lng);
    var overlay = new CustomOverlay(position, item);
    // overlay.setContent('<h2>标题</h2>');
    overlay.setMap(this.map);

    return overlay;
  }

  disableMap(): void {
    console.log('disable map...');
  }

  enableMap(): void {
    console.log('enable map...');
  }

}

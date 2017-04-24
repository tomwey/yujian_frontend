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

  isLoading: boolean = false;
  loadState: string = '';
  hbCount: number = 0;
  mapLoaded: boolean = false;

  constructor(public navCtrl: NavController, 
              private hbService: RedPacketService,
              private mapService: MapService,
              private locationService: LocationService,
              private toolService: ToolService) {

  }

  ionViewDidLoad() {
    this.startLocation();
  }

  relocate() {
    this.startLocation();
  }

  startLocation() {
    // console.log('开始定位中...');
    this.isLoading = true;

    // this.toolService.showLoading('开始定位中...');
    this.loadState = '定位中...';

    this.locationService.getPosition().then(position => {
      
      // console.log(position);
        this.showMap(position);
      
    }).catch(error => {
      console.log('定位失败：' + error);
      // this.toolService.hideLoading();
      // this.toolService.showToast('定位失败');
      this.loadState = '获取位置失败';
      this.isLoading = false;
    });
  }

  showMap(position): void {
    // this.toolService.showLoading('地图加载中...');
    this.mapService.createQQMap(this.mapElement.nativeElement, position)
      .then(map => {
        if (this.map) {

        } else {
          this.map = map;
          this.mapLoaded = true;
        }
        
        // qq.maps.event.removeListener(this.map, 'center_changed');
        // qq.maps.event.addListener(this.map, 'center_changed', function() {
        //   this.isLoading = true;
        //   this.loadState = '拼命加载中...';
        //   this.loadHongbao(this.map.getCenter().lat, this.map.getCenter().lng);
        // });
        
        this.isLoading = true;
        this.loadState = '拼命加载中...';
        this.loadHongbao(this.map.getCenter().lat, this.map.getCenter().lng);
      })
      .catch(error => {

        // this.toolService.hideLoading();
        // this.toolService.showToast(error);
        this.loadState = 'Oops,出错了!';
        this.isLoading = false;
      });
  }

  addInfoWindow(position): void {
    //声明类,opts为类属性，初始化时传入（非必须，看实际需求）
    var MyOverlay = function(opts){
	    qq.maps.Overlay.call(this, opts);
    };

    //继承Overlay基类
    MyOverlay.prototype = new qq.maps.Overlay();
    //实现构造方法
    MyOverlay.prototype.construct = function() {
	
	 //创建了覆盖物的容器，这里我用了一个div，并且设置了样式
	  this.dom = document.createElement('div');
	  this.dom.style.cssText = 
		  'background:#0f0;color:white;position:absolute;' + 
		  'text-align:center;width:100px;height:30px';

	  //将初始化的html填入到了窗口里，这根据您自己的需要决定是否加这属性
	  this.dom.innerHTML = this.get('inithtml');

	  //将dom添加到覆盖物层
	  this.getPanes().overlayLayer.appendChild(this.dom);
  };

  //自定义的方法，用于设置myOverlay的html
  MyOverlay.prototype.html=function(html){
	  this.dom.innerHTML=html;
  }
  //实现绘制覆盖物的方法（覆盖物的位置在此控制）
  MyOverlay.prototype.draw = function() {
	  //获取地理经纬度坐标
    var position = this.get('position');
    if (position) {
      var pixel = this.getProjection().fromLatLngToDivPixel(position);
      this.dom.style.left = pixel.getX() + 'px';
      this.dom.style.top = pixel.getY() + 'px';
    }
  };
//实现析构方法（类生命周期结束时会自动调用，用于释放资源等）
  MyOverlay.prototype.destroy = function() {
	  //移除dom
	  this.dom.parentNode.removeChild(this.dom);
  };
  //以上自定义Overlay代码结束 =================================================

  let label = new MyOverlay({
    map: this.map,
    position: this.map.getCenter(),
    inithtml: 'test',
  });

  label.html = '<div class="custom-overlay">dddddddddd</div>';
}

  addCurrentPositionMarker(position): void {
    let gpsLatLng = new qq.maps.LatLng(position.lat,position.lng);

     qq.maps.convertor.translate(gpsLatLng, 1, (res) => {
      let marker = new qq.maps.Marker({
        position: res[0],
        map: this.map,
      });
      
      var anchor = new qq.maps.Point(0, 0),
         size = new qq.maps.Size(19, 29),
         origin = new qq.maps.Point(0, 0),
         markerIcon = new qq.maps.MarkerImage(
     "assets/images/icon_ding.png",
      size, 
      origin,
      anchor
      );
      marker.setIcon(markerIcon);

    });
  }

  refresh() {
    this.startLocation();
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
        // new qq.maps.Marker({
        //   position: latLng,
        //   map: this.map
        // })
        this.addInfoWindow(latLng);
      }
      this.isLoading = false;
      if (data.length > 0) {
        this.loadState = '快快去抢吧!';
      } else {
        this.loadState = '红包就快来了!';
      }

      this.hbCount = data.length;

    }, err => {
      // console.log(err);
      this.isLoading = false;
      this.loadState = '获取红包失败!';
    });
  }

}

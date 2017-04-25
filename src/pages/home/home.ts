import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RedPacketService } from '../../providers/red-packet-service';
import { MapService } from '../../providers/map-service';
import { LocationService } from '../../providers/location-service';
import { ToolService } from '../../providers/tool-service';
import { HBDetailPage } from '../hb-detail/hb-detail';

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
    document.addEventListener('hb.click', (e) => {
      // console.log(e['detail']);
      let item = e['detail'];
      this.navCtrl.push(HBDetailPage, { item: item });
    });
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
      this.toolService.showToast('定位失败');
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

  addInfoWindow(position, item): void {
    
    function CustomOverlay(position, data) {
        this.data = data;
        this.position = position;
    }
    CustomOverlay.prototype = new qq.maps.Overlay();
    //定义construct,实现这个接口来初始化自定义的Dom元素
    CustomOverlay.prototype.construct = function() {
        var div = this.div = document.createElement("div");
        var divStyle = this.div.style;
        divStyle.position = "absolute";
        divStyle.width = "36px";
        divStyle.height = "48px";
        divStyle.background = "url(assets/images/map_img_hb.png) no-repeat center center";
        // divStyle.border = "1px solid #000000";
        divStyle.textAlign = "center";
        // divStyle.lineHeight = "24px";
        divStyle.borderRadius = "6px";
        divStyle.cursor = "pointer";
        this.div.innerHTML = 
          '<div class="hb-marker"><img src="' + this.data.owner.avatar + '"><p>' + this.data.quantity + '</p></div>';
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
            var event = new CustomEvent('hb.click', { 'detail': self.data });
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

    // var latlng = map.getCenter();
    var overlay = new CustomOverlay(position, item);
    // overlay.setContent('<h2>标题</h2>');
    overlay.setMap(this.map);

  }

  refresh() {
    this.startLocation();
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
        this.addInfoWindow(latLng, item);
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

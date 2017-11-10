import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { Market } from '@ionic-native/market';

import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';

declare var LocationPlugin;

@Injectable()
export class NativeService {

  constructor(
    private platform: Platform,
    private network: Network,
    private inAppBrowser: InAppBrowser,
    private appVersion: AppVersion,
    private device: Device,
    private market: Market,
  ) {
  }

  /**
   * 获取app相关信息
   */
  getAppVersion(): Promise<any> {
    return this.appVersion.getVersionNumber();
  }

  /**
   * 是否真机环境
   * @return {boolean}
   */
  isMobile() {
    return this.platform.is('mobile') && !this.platform.is('mobileweb');
  }

  /**
   * 通过浏览器打开url
   */
  openUrlByBrowser(url: string): void {
    this.inAppBrowser.create(url, '_system');
  }

  downloadApp(appIdOrUrl) {
    if (this.isIos) {
      this.market.open(appIdOrUrl);
    } else {

    }
  }

  /**
   * 获得用户当前坐标
   * @return {Promise<T>}
   */
  getUserLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isMobile()) {
        LocationPlugin.getLocation(data => {
          // alert(JSON.stringify(data));
          resolve({lng: data.longitude, lat: data.latitude});
        }, msg => {
          // console.error('定位错误消息' + msg);
          // alert(msg.indexOf('缺少定位权限') == -1 ? ('错误消息：' + msg) : '缺少定位权限，请在手机设置中开启');
          reject('定位失败');
        });
      } else {
        console.log('非手机环境,即测试环境返回固定坐标');
        resolve({lng: 104.350912, lat: 30.670543});
      }
    });
  }

  /**
   * 是否android真机环境
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android');
  }

  /**
   * 是否ios真机环境
   */
  isIos(): boolean {
    return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
  }

  /**
   * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
   */
  getNetworkType(): string {
    if (!this.isMobile()) {
      return 'wifi';
    }
    return this.network.type;
  }

  /**
   * 判断是否有网络
   */
  isConnecting(): boolean {
    return this.getNetworkType() != 'none';
  }
  
}

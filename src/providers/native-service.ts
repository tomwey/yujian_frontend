import { Injectable } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
import { Market } from '@ionic-native/market';
import { Diagnostic } from '@ionic-native/diagnostic';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import {File, FileEntry} from "@ionic-native/file";
import {FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';

import {Observable} from "rxjs";

import { GlobalData } from "./global-data";

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
    private alertCtrl: AlertController,
    private diagnostic: Diagnostic,
    private transfer: FileTransfer,
    private file: File,
    private globalData: GlobalData,
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
      if (this.isAndroid()) {
        this.downloadAndroid(appIdOrUrl);
      }
    }
  }

  // Android本地安装
  private downloadAndroid(appIdOrUrl) {
    this.externalStoragePermissionsAuthorization().subscribe(() => {
      let backgroundProcess = false; // 是否后台下载
      let alert = this.alertCtrl.create({ // 显示下载进度
        title: '下载进度：0%',
        enableBackdropDismiss: false,
        buttons: [{
          text: '后台下载', handler: () => {
            backgroundProcess = true;
          }
        }]
      });
      alert.present();
      const fileTransfer: FileTransferObject = this.transfer.create();
      const apk = this.file.externalRootDirectory + 'download/' + `android_${new Date().getTime()}.apk`; //apk保存的目录
      //下载并安装apk
      fileTransfer.download(appIdOrUrl, apk).then(() => {
        window['install'].install(apk.replace('file://', ''));
      }, err => {
        this.globalData.updateProgress = -1;
        alert.dismiss();
        // this.logger.log(err, 'android app 本地升级失败');
        this.alertCtrl.create({
          title: '前往网页下载',
          subTitle: '本地升级失败',
          buttons: [
            {
              text: '确定',
              handler: () => {
                this.openUrlByBrowser(appIdOrUrl);//打开网页下载
              }
            }
          ]
        }).present();
      });

      let timer = null;//由于onProgress事件调用非常频繁,所以使用setTimeout用于函数节流
      fileTransfer.onProgress((event: ProgressEvent) => {
        let progress = Math.floor(event.loaded / event.total * 100);//下载进度
        this.globalData.updateProgress = progress;
        if (!backgroundProcess) {
          if (progress === 100) {
            alert.dismiss();
          } else {
            if (!timer) {
              timer = setTimeout(() => {
                clearTimeout(timer);
                timer = null;
                let title = document.getElementsByClassName('alert-title')[0];
                title && (title.innerHTML = `下载进度：${progress}%`);
              }, 1000);
            }
          }
        }
      }); // end timer

    });
  }

  //检测app是否有读取存储权限
  private externalStoragePermissionsAuthorization = (() => {
    let havePermission = false;
    return () => {
      return Observable.create(observer => {
        if (havePermission) {
          observer.next(true);
        } else {
          let permissions = [this.diagnostic.permission.READ_EXTERNAL_STORAGE, this.diagnostic.permission.WRITE_EXTERNAL_STORAGE];
          this.diagnostic.getPermissionsAuthorizationStatus(permissions).then(res => {
            if (res.READ_EXTERNAL_STORAGE == 'GRANTED' && res.WRITE_EXTERNAL_STORAGE == 'GRANTED') {
              havePermission = true;
              observer.next(true);
            } else {
              havePermission = false;
              this.diagnostic.requestRuntimePermissions(permissions).then(res => {//请求权限
                if (res.READ_EXTERNAL_STORAGE == 'GRANTED' && res.WRITE_EXTERNAL_STORAGE == 'GRANTED') {
                  havePermission = true;
                  observer.next(true);
                } else {
                  havePermission = false;
                  this.alertCtrl.create({
                    title: '缺少读取存储权限',
                    subTitle: '请在手机设置或app权限管理中开启',
                    buttons: [{text: '取消'},
                      {
                        text: '去开启',
                        handler: () => {
                          this.diagnostic.switchToSettings();
                        }
                      }
                    ]
                  }).present();
                }
              }).catch(err => {
                // this.logger.log(err, '调用diagnostic.requestRuntimePermissions方法失败');
              });
            }
          }).catch(err => {
            // this.logger.log(err, '调用diagnostic.getPermissionsAuthorizationStatus方法失败');
          });
        }
      });
    };
  })(); 

  /**
   * 获得用户当前坐标
   * @return {Promise<T>}
   */
  getUserLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      if (this.isMobile()) {
        this.assertLocationService().subscribe(res => {
          if (res) {
            this.assertLocationAuthorization().subscribe(res => {
              if (res) {
                // this.getUserLocation()
                this.getLocation().then(data => {
                  resolve(data);
                }).catch(error => reject(error));
                // return this.getLocation(observer);
              }
            })
          }
        })

        // LocationPlugin.getLocation(data => {
        //   // alert(JSON.stringify(data));
        //   resolve({lng: data.longitude, lat: data.latitude});
        // }, msg => {
        //   // console.error('定位错误消息' + msg);
        //   // alert(msg.indexOf('缺少定位权限') == -1 ? ('错误消息：' + msg) : '缺少定位权限，请在手机设置中开启');
        //   reject('定位失败');
        // });
      } else {
        console.log('非手机环境,即测试环境返回固定坐标');
        resolve({lng: 104.350912, lat: 30.670543});
      }
    });
  }

  private getLocation(): Promise<any> {
    return new Promise((resolve, reject) => {
      LocationPlugin.getLocation(data => {
        // observer.next({'lng': data.longitude, 'lat': data.latitude});
        resolve({lng: data.longitude, lat: data.latitude});
      }, msg => {
        reject('获取位置失败');
        if (msg.indexOf('缺少定位权限') != -1) {
          this.alertCtrl.create({
            title: '缺少定位权限',
            subTitle: '请在手机设置或app权限管理中开启',
            buttons: [{text: '取消'},
              {
                text: '去开启',
                handler: () => {
                  this.diagnostic.switchToSettings();
                }
              }
            ]
          }).present();
        } else if (msg.indexOf('WIFI信息不足') != -1) {
          alert('定位失败,请确保连上WIFI或者关掉WIFI只开流量数据')
        } else if (msg.indexOf('网络连接异常') != -1) {
          alert('网络连接异常,请检查您的网络是否畅通')
        } else {
          alert('位置错误,错误消息:' + msg);
          // this.logger.log(msg, '获取位置失败');
        }
      });
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

  //检测app位置服务是否开启
  private assertLocationService = (() => {
    let enabledLocationService = false;//手机是否开启位置服务
    return () => {
      return Observable.create(observer => {
        if (enabledLocationService) {
          observer.next(true);
        } else {
          this.diagnostic.isLocationEnabled().then(enabled => {
            if (enabled) {
              enabledLocationService = true;
              observer.next(true);
            } else {
              enabledLocationService = false;
              this.alertCtrl.create({
                title: '您未开启位置服务',
                subTitle: '正在获取位置信息',
                buttons: [{text: '取消'},
                  {
                    text: '去开启',
                    handler: () => {
                      this.diagnostic.switchToLocationSettings();
                    }
                  }
                ]
              }).present();
            }
          }).catch(err => {
            // this.logger.log(err, '调用diagnostic.isLocationEnabled方法失败');
          });
        }
      });
    };
  })();

  //检测app是否有定位权限
  private assertLocationAuthorization = (() => {
    let locationAuthorization = false;
    return () => {
      return Observable.create(observer => {
        if (locationAuthorization) {
          observer.next(true);
        } else {
          this.diagnostic.isLocationAuthorized().then(res => {
            if (res) {
              locationAuthorization = true;
              observer.next(true);
            } else {
              locationAuthorization = false;
              this.diagnostic.requestLocationAuthorization('always').then(res => {//请求定位权限
                if (res == 'DENIED_ALWAYS') {//拒绝访问状态,必须手动开启
                  locationAuthorization = false;
                  this.alertCtrl.create({
                    title: '缺少定位权限',
                    subTitle: '请在手机设置或app权限管理中开启',
                    buttons: [{text: '取消'},
                      {
                        text: '去开启',
                        handler: () => {
                          this.diagnostic.switchToSettings();
                        }
                      }
                    ]
                  }).present();
                } else {
                  locationAuthorization = true;
                  observer.next(true);
                }
              }).catch(err => {
                // this.logger.log(err, '调用diagnostic.requestLocationAuthorization方法失败');
              });
            }
          }).catch(err => {
            // this.logger.log(err, '调用diagnostic.isLocationAvailable方法失败');
          });
        }
      });
    };
  })();
  
}

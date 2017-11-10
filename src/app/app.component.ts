import { Component } from '@angular/core';
import { Platform, ModalController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from "../pages/tabs/tabs";
// import { AccountBindPage } from '../pages/account-bind/account-bind';
import { UserService } from '../providers/user-service';
import { WechatProvider } from "../providers/wechat/wechat";
import { UtilsServiceProvider } from "../providers/utils-service/utils-service";
import { ToolService } from '../providers/tool-service';
import { LocationService } from "../providers/location-service";
// import { LoginPage } from '../pages/login/login';

import { NativeService } from '../providers/native-service';

///<reference path="../node_modules/ifvisible.js/ifvisible.d.ts"/>
import * as ifvisible from 'ifvisible.js';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;//'TabsPage';

  constructor(private platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private users: UserService,
              // private _app: App, 
              private wechat: WechatProvider,
              private utils: UtilsServiceProvider,
              private tool: ToolService,
              private modalCtrl: ModalController,
              private locService: LocationService,
              // private qqMaps: QQMaps,
              // private _ionicApp: IonicApp,
              private events: Events,
              private nativeService: NativeService
              ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleLightContent();
      
      if (platform.is('cordova')) {
        platform.pause.subscribe(() => {
          this.onPause();
        });
        platform.resume.subscribe(() => {
          this.onResume();
        });
      }

      this.sendUserSession2('begin');

      // ifvisible.on("blur", () => {
      //   this.sendUserSession2('end');
      // });

      // this.initWXJSSDK();
      // this.initWXAuth();

      this.checkVersion();
    });
  }

  private onPause() {
    this.sendUserSession2('end');
  }

  private onResume() {
    this.sendUserSession2('begin');

    this.checkVersion();
  }

  private checkVersion() {
    if (this.platform.is('cordova')) {
      setTimeout(() => {
        this.users.checkVersion().then(data => {
          
                }).catch(error => {});
      }, 1000);
    }
  }

  private listenToUserLogin(): void {
    this.events.subscribe('user:login', () => {
      this.rootPage = TabsPage;

      this.sendUserSession2('begin');
    })
  }

  // private checkLogin(splashScreen) {
  //   this.users.token().then(token => {
  //     if (!token) {
  //       this.rootPage = LoginPage;//'LoginPage';
  //     } else {
  //       this.rootPage = TabsPage;

  //       this.sendUserSession2('begin');
  //     }
  //     // splashScreen.hide();
  //   });
  // }

  private sendUserSession2(action: string) {
    let network = this.nativeService.getNetworkType();
    
    this.nativeService.getUserLocation()
      .then(pos => {
        this._sendSessionReq(action, network, `${pos.lng},${pos.lat}`);
      })
      .catch(error => {
        this._sendSessionReq(action, network, null);
      });
  }

  private initWXAuth() {
    this.users.token().then(token => {
      if (!token) {
        let code = UtilsServiceProvider.getQueryString('code');
        if (code) {
          this.tool.showLoading('登录绑定中...');

          this.utils.handleWXAuth(code)
            .then(data => {
              this.tool.hideLoading();

              this.users.saveToken(data.token)
                .then(() => {
                  this.rootPage = TabsPage;
                }).catch(error => {});
              
              this.initWXJSSDK();

            })
            .catch(error => {
              this.tool.hideLoading();
              setTimeout(() => {
                this.tool.showToast('登录失败，请重新登录！');
                // this.rootPage = AccountBindPage;
              }, 200);
            });
        } else {
          // this.rootPage = AccountBindPage;//'account-bind';
        }
      } else {
        // this.nav.setRoot(TabsPage);
        this.rootPage = TabsPage;

        this.initWXJSSDK();
      }
    });
  }

  private initWXJSSDK() {
    this.wechat.config('wx_app_url').then(data => {
      this.sendUserSession('begin');
    }).catch(error => {
      // console.log(`微信配置结果：${error}`);
      this.sendUserSession('begin');
    });
  }

  private sendUserSession(action: string) {
    wx.getNetworkType({
        success: (res) => {
          this._sendSession(action, res.networkType);
        },
        fail: (error) => {
          this._sendSession(action, null);
        },
    });
  }

  private _sendSession(action, network) {
    this.locService.getUserPosition(true)
      .then(pos => {
        this._sendSessionReq(action, network, `${pos.lng},${pos.lat}`);
      })
      .catch(error => {
        this._sendSessionReq(action, network, null);
      });
    // wx.getLocation({
    //     type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    //     success: (res) => {
    //       this._sendSessionReq(action, network, `${res.longitude},${res.latitude}`);
    //     },
    //     fail: (error) => {
    //       this._sendSessionReq(action, network, null);
    //     }
    // });
  }

  private _sendSessionReq(action, network, loc) {
    this.users.handleSession(action, loc, network)
      .then(data => {
        // 返回签到的红包数据
        // console.log(data);
        if (action === 'begin' && data.hb) {
          this.openHBWall(data.hb);
        }
      } )
      .catch(error => {});
  }
  
  openHBWall(hb): void {
    let payload = { hb: hb, hbTitle: '签到红包' };    
    let modal = this.modalCtrl.create('HBWallPage', payload, {
      enableBackdropDismiss: false,
    });
    modal.present();
  }
}

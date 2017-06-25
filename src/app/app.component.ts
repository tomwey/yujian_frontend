import { Component } from '@angular/core';
import { Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from "../pages/tabs/tabs";
import { AccountBindPage } from '../pages/account-bind/account-bind';
import { UserService } from '../providers/user-service';
import { WechatProvider } from "../providers/wechat/wechat";
import { UtilsServiceProvider } from "../providers/utils-service/utils-service";
import { ToolService } from '../providers/tool-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;//TabsPage;//'TabsPage';

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private users: UserService,
              private _app: App, 
              private wechat: WechatProvider,
              private utils: UtilsServiceProvider,
              private tool: ToolService,
              // private _ionicApp: IonicApp,
              ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.initWXJSSDK();
    });

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
            })
            .catch(error => {
              this.tool.hideLoading();
              setTimeout(() => {
                this.tool.showToast('登录失败，请重新登录！');
                this.rootPage = AccountBindPage;
              }, 200);
            });
        } else {
          this.rootPage = AccountBindPage;//'account-bind';
        }
      } else {
        // this.nav.setRoot(TabsPage);
        this.rootPage = TabsPage;
      }
    });
  }

  private initWXJSSDK() {
    this.wechat.config('wx_app_url').then(data => {
      console.log(`微信配置结果：${data}`);
    }).catch(error => {
      console.log(`微信配置结果：${error}`);
    });
  }
  
}

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';

// 服务类导入
import { ApiService } from '../providers/api-service';
import { RedPacketService } from '../providers/red-packet-service';
import { MapService } from '../providers/map-service';
import { LocationService } from '../providers/location-service';
import { ToolService } from '../providers/tool-service';
import { QQMaps } from '../providers/qq-maps';

// 页面导入
import { ExplorePage } from '../pages/explore/explore';
import { SettingPage } from '../pages/setting/setting';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { HBDetailPage } from '../pages/hb-detail/hb-detail'; 

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    ExplorePage,
    SettingPage,
    HomePage,
    TabsPage,
    HBDetailPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      backButtonText: '',
      tabsHideOnSubPages: true,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ExplorePage,
    SettingPage,
    HomePage,
    TabsPage,
    HBDetailPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    QQMaps,
    ApiService,
    RedPacketService,
    MapService,
    LocationService,
    ToolService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

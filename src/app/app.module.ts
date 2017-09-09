import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

// 初次导入页面

import { TabsPage } from '../pages/tabs/tabs';
import { HomeExplorePage } from "../pages/home-explore/home-explore";
// import { MyEventsPage } from "../pages/my-events/my-events";
// import { ExplorePage } from "../pages/explore/explore";
// import { ShareListPage } from "../pages/share-list/share-list";
import { NearbyPage } from "../pages/nearby/nearby";
import { SettingPage } from "../pages/setting/setting";
import { AccountBindPage } from "../pages/account-bind/account-bind";
import { EventDetailPage } from "../pages/event-detail/event-detail";
import { TaskPage } from '../pages/task/task';
// import { NewRedbagPage } from "../pages/new-redbag/new-redbag";

// 服务类导入
import { ApiService }       from '../providers/api-service';
import { ToolService }      from '../providers/tool-service';
// import { QQMaps }           from '../providers/qq-maps';
import { LocationService }  from '../providers/location-service';
import { UserService }      from '../providers/user-service';
import { PayService }      from '../providers/pay-service';
import { EventsService}     from '../providers/events-service';
import { BannersService}     from '../providers/banners-service';
import { OfferwallChannelService } from "../providers/offerwall-channel-service";

// import { StatusBar } from '@ionic-native/status-bar';
// import { SplashScreen } from '@ionic-native/splash-screen';
import { LocationSearchProvider } from '../providers/location-search/location-search';
import { UtilsServiceProvider } from '../providers/utils-service/utils-service';
import { WechatProvider } from '../providers/wechat/wechat';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomeExplorePage,
    AccountBindPage,
    // ExplorePage,
    // ShareListPage,
    NearbyPage,
    // MyEventsPage,
    // NewRedbagPage,
    TaskPage,
    SettingPage,
    EventDetailPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      // preloadModules: true,
      mode: 'ios',
      backButtonText: '',
      tabsHideOnSubPages: true,
      // pageTransition: 'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    HomeExplorePage,
    AccountBindPage,
    // ExplorePage,
    // ShareListPage,
    NearbyPage,
    SettingPage,
    // MyEventsPage,
    // NewRedbagPage,
    TaskPage,
    EventDetailPage,
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    // QQMaps,
    LocationService,
    ApiService,
    ToolService,
    UserService,
    PayService,
    EventsService,
    BannersService,
    LocationSearchProvider, 
    UtilsServiceProvider, 
    WechatProvider,
    OfferwallChannelService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    
  ]
})
export class AppModule {}

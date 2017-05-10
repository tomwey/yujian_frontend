import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';
import { NewEventPage } from '../pages/new-event/new-event';

// 服务类导入
import { ApiService }       from '../providers/api-service';
import { RedPacketService } from '../providers/red-packet-service';
import { MapService }       from '../providers/map-service';
import { LocationService }  from '../providers/location-service';
import { ToolService }      from '../providers/tool-service';
import { QQMaps }           from '../providers/qq-maps';
import { UserService }      from '../providers/user-service';
import { EventsService}     from '../providers/events-service';

// 页面导入
import { ExplorePage }  from '../pages/explore/explore';
import { SettingPage }  from '../pages/setting/setting';
import { HomePage }     from '../pages/home/home';
import { TabsPage }     from '../pages/tabs/tabs';
import { HBDetailPage } from '../pages/hb-detail/hb-detail'; 
// import { WalletPage } from '../pages/wallet/wallet';

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
    NewEventPage,
    // WalletPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      mode: 'ios',
      backButtonText: '',
      tabsHideOnSubPages: true,
      // pageTransition: 'ios-transition'
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
    NewEventPage,
    // WalletPage,
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
    UserService,
    EventsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

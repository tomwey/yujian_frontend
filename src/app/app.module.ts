import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from "../pages/home/home";
import { AccountBindPage } from "../pages/account-bind/account-bind";

// 服务类导入
import { ApiService }       from '../providers/api-service';
// import { RedPacketService } from '../providers/red-packet-service';
// import { MapService }       from '../providers/map-service';
// import { LocationService }  from '../providers/location-service';
import { ToolService }      from '../providers/tool-service';
import { QQMaps }           from '../providers/qq-maps';
import { UserService }      from '../providers/user-service';
import { EventsService}     from '../providers/events-service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocationSearchProvider } from '../providers/location-search/location-search';
import { LocationProvider } from '../providers/location/location';
import { UtilsServiceProvider } from '../providers/utils-service/utils-service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    HomePage,
    AccountBindPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
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
    HomePage,
    AccountBindPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    QQMaps,
    ApiService,
    // RedPacketService,
    // MapService,
    // LocationService,
    ToolService,
    UserService,
    EventsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}, LocationSearchProvider, LocationProvider, UtilsServiceProvider,
  ]
})
export class AppModule {}

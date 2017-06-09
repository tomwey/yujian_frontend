import { Component } from '@angular/core';
import { Platform, IonicApp, App, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from "../pages/tabs/tabs";
import { AccountBindPage } from '../pages/account-bind/account-bind';
import { UserService } from '../providers/user-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;//TabsPage;//'TabsPage';

  constructor(platform: Platform, statusBar: StatusBar, 
              splashScreen: SplashScreen,
              private users: UserService,
              private _app: App, 
              private _ionicApp: IonicApp,
              private _menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      // this.setupBackButtonBehavior();
    });

    this.users.token().then(token => {
      if (!token) {
        this.rootPage = AccountBindPage;
      } else {
        // this.nav.setRoot(TabsPage);
        this.rootPage = TabsPage;
      }
    });
  }

  private setupBackButtonBehavior(): void {
    // If on web version (browser)
    if (window.location.protocol !== "file:") {
      // Register browser back button action(s)
      window.onpopstate = (evt) => {
        console.log('pop ... pop ...');
        // Close menu if open
        if (this._menu.isOpen()) {
          this._menu.close();
          return;
        }

        // Close any active modals or overlays
        let activePortal = this._ionicApp._loadingPortal.getActive() ||
          this._ionicApp._modalPortal.getActive() ||
          this._ionicApp._toastPortal.getActive() ||
          this._ionicApp._overlayPortal.getActive();

        if (activePortal) {
          activePortal.dismiss();
          return;
        }

        // Navigate back
        if (this._app.getRootNav().canGoBack()) {
          this._app.getRootNav().pop();
        }
          
      };

      // Fake browser history on each view enter
      this._app.viewDidEnter.subscribe((app) => {
        history.pushState(null, null, "");
      });
    }
  }
}

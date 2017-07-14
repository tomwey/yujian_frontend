import { Component } from '@angular/core';
// import { IonicPage } from "ionic-angular";
import { HomePage } from '../home/home';
import { ExplorePage } from '../explore/explore';
import { SettingPage } from '../setting/setting';
// import { NewEventPage } from '../new-event/new-event';
import { MyEventsPage } from '../my-events/my-events';

// @IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ExplorePage;
  tab3Root = MyEventsPage;
  tab4Root = SettingPage;

  constructor() {

  }
}

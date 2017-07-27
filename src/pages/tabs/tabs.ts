import { Component } from '@angular/core';
// import { IonicPage } from "ionic-angular";
import { HomeExplorePage } from '../home-explore/home-explore';
// import { ExplorePage } from '../explore/explore';
import { ShareListPage } from '../share-list/share-list';
import { SettingPage } from '../setting/setting';
// import { NewEventPage } from '../new-event/new-event';
import { MyEventsPage } from '../my-events/my-events';

// @IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomeExplorePage;
  tab2Root = ShareListPage;//ExplorePage;
  tab3Root = MyEventsPage;
  tab4Root = SettingPage;

  constructor() {

  }
}

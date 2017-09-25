import { Component } from '@angular/core';
// import { IonicPage } from "ionic-angular";
import { HomeExplorePage } from '../home-explore/home-explore';
// import { ExplorePage } from '../explore/explore';
// import { ShareListPage } from '../share-list/share-list';
import { NearbyPage } from "../nearby/nearby";
import { SettingPage } from '../setting/setting';
// import { NewRedbagPage } from "../new-redbag/new-redbag";
// import { NewEventPage } from '../new-event/new-event';
// import { MyEventsPage } from '../my-events/my-events';
// import { TaskPage } from "../task/task";
import { CardPage } from '../card/card';

// @IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomeExplorePage;
  tab2Root = NearbyPage;//ShareListPage;//ExplorePage;
  tab3Root = CardPage;//TaskPage;
  tab4Root = SettingPage;

  constructor() {

  }
}

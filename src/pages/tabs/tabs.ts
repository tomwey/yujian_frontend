import { Component } from '@angular/core';

import { ExplorePage } from '../explore/explore';
import { SettingPage } from '../setting/setting';
import { HomePage } from '../home/home';
import { NewEventPage } from '../new-event/new-event';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ExplorePage;
  tab3Root = NewEventPage;
  tab4Root = SettingPage;

  constructor() {

  }
}

import { Component } from '@angular/core';
import { IonicPage } from "ionic-angular";
// import { HomePage } from '../home/home';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'HomePage';
  tab2Root = 'ExplorePage';
  tab3Root = 'NewEventPage';
  tab4Root = 'SettingPage';

  constructor() {

  }
}

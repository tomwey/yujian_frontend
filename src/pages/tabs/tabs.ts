import { Component } from '@angular/core';
import { IonicPage } from "ionic-angular";
// import { HomePage } from '../home/home';

@IonicPage({
  name: 'tabs',
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = 'home';
  tab2Root = 'explore';
  tab3Root = 'new-event';
  tab4Root = 'setting';

  constructor() {

  }
}

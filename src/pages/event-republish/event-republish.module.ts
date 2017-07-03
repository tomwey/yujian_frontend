import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventRepublishPage } from './event-republish';

@NgModule({
  declarations: [
    EventRepublishPage,
  ],
  imports: [
    IonicPageModule.forChild(EventRepublishPage),
  ],
  exports: [
    EventRepublishPage
  ]
})
export class EventRepublishPageModule {}

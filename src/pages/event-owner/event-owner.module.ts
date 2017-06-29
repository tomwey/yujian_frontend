import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventOwnerPage } from './event-owner';

@NgModule({
  declarations: [
    EventOwnerPage,
  ],
  imports: [
    IonicPageModule.forChild(EventOwnerPage),
  ],
  exports: [
    EventOwnerPage
  ]
})
export class EventOwnerPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventBodyPage } from './event-body';

@NgModule({
  declarations: [
    EventBodyPage,
  ],
  imports: [
    IonicPageModule.forChild(EventBodyPage),
  ],
  exports: [
    EventBodyPage
  ]
})
export class EventBodyPageModule {}

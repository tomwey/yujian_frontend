import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventResult } from './event-result';

@NgModule({
  declarations: [
    EventResult,
  ],
  imports: [
    IonicPageModule.forChild(EventResult),
  ],
  exports: [
    EventResult
  ]
})
export class EventResultModule {}

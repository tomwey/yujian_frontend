import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventScopePage } from './event-scope';

@NgModule({
  declarations: [
    EventScopePage,
  ],
  imports: [
    IonicPageModule.forChild(EventScopePage),
  ],
  exports: [
    EventScopePage
  ]
})
export class EventScopePageModule {}

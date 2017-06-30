import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventPreviewPage } from './event-preview';

@NgModule({
  declarations: [
    EventPreviewPage,
  ],
  imports: [
    IonicPageModule.forChild(EventPreviewPage),
  ],
  exports: [
    EventPreviewPage
  ]
})
export class EventPreviewPageModule {}

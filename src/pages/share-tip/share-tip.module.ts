import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShareTipPage } from './share-tip';

@NgModule({
  declarations: [
    ShareTipPage,
  ],
  imports: [
    IonicPageModule.forChild(ShareTipPage),
  ],
  exports: [
    ShareTipPage
  ]
})
export class ShareTipPageModule {}

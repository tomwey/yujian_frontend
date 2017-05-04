import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HBResultPage } from './hb-result';

@NgModule({
  declarations: [
    HBResultPage,
  ],
  imports: [
    IonicPageModule.forChild(HBResultPage),
  ],
  exports: [
    HBResultPage
  ]
})
export class HBResultModule {}

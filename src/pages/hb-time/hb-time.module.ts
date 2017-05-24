import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HBTimePage } from './hb-time';

@NgModule({
  declarations: [
    HBTimePage,
  ],
  imports: [
    IonicPageModule.forChild(HBTimePage),
  ],
  exports: [
    HBTimePage
  ]
})
export class HbTimePageModule {}

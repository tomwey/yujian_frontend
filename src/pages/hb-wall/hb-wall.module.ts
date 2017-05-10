import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HBWallPage } from './hb-wall';

@NgModule({
  declarations: [
    HBWallPage,
  ],
  imports: [
    IonicPageModule.forChild(HBWallPage),
  ],
  exports: [
    HBWallPage
  ]
})
export class HBWallModule {}

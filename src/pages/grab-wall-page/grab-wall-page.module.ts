import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GrabWallPage } from './grab-wall-page';

@NgModule({
  declarations: [
    GrabWallPage,
  ],
  imports: [
    IonicPageModule.forChild(GrabWallPage),
  ],
  exports: [
    GrabWallPage
  ]
})
export class GrabWallPageModule {}

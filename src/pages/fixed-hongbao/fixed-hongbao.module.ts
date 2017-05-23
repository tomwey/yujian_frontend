import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FixedHongbaoPage } from './fixed-hongbao';

@NgModule({
  declarations: [
    FixedHongbaoPage,
  ],
  imports: [
    IonicPageModule.forChild(FixedHongbaoPage),
  ],
  exports: [
    FixedHongbaoPage
  ]
})
export class FixedHongbaoPageModule {}

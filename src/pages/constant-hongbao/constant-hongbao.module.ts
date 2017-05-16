import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConstantHongbaoPage } from './constant-hongbao';

@NgModule({
  declarations: [
    ConstantHongbaoPage,
  ],
  imports: [
    IonicPageModule.forChild(ConstantHongbaoPage),
  ],
  exports: [
    ConstantHongbaoPage
  ]
})
export class ConstantHongbaoPageModule {}

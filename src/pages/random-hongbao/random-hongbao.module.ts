import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RandomHongbaoPage } from './random-hongbao';

@NgModule({
  declarations: [
    RandomHongbaoPage,
  ],
  imports: [
    IonicPageModule.forChild(RandomHongbaoPage),
  ],
  exports: [
    RandomHongbaoPage
  ]
})
export class RandomHongbaoPageModule {}

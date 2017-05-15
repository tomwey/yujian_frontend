import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewHongbaoPage } from './new-hongbao';

@NgModule({
  declarations: [
    NewHongbaoPage,
  ],
  imports: [
    IonicPageModule.forChild(NewHongbaoPage),
  ],
  exports: [
    NewHongbaoPage
  ]
})
export class NewHongbaoPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCardDetailPage } from './my-card-detail';

@NgModule({
  declarations: [
    MyCardDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCardDetailPage),
  ],
  exports: [
    MyCardDetailPage
  ]
})
export class MyCardDetailPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyCardsPage } from './my-cards';

@NgModule({
  declarations: [
    MyCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyCardsPage),
  ],
  exports: [
    MyCardsPage
  ]
})
export class MyCardsPageModule {}

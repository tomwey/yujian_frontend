import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserCardsPage } from './user-cards';

@NgModule({
  declarations: [
    UserCardsPage,
  ],
  imports: [
    IonicPageModule.forChild(UserCardsPage),
  ],
  exports: [
    UserCardsPage
  ]
})
export class UserCardsPageModule {}

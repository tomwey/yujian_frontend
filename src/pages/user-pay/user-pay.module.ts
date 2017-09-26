import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserPayPage } from './user-pay';

@NgModule({
  declarations: [
    UserPayPage,
  ],
  imports: [
    IonicPageModule.forChild(UserPayPage),
  ],
  exports: [
    UserPayPage
  ]
})
export class UserPayPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinAccurcyPage } from './checkin-accurcy';

@NgModule({
  declarations: [
    CheckinAccurcyPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinAccurcyPage),
  ],
  exports: [
    CheckinAccurcyPage
  ]
})
export class CheckinAccurcyPageModule {}

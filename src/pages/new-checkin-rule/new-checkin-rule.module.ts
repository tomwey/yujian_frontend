import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCheckinRulePage } from './new-checkin-rule';

@NgModule({
  declarations: [
    NewCheckinRulePage,
  ],
  imports: [
    IonicPageModule.forChild(NewCheckinRulePage),
  ],
  exports: [
    NewCheckinRulePage
  ]
})
export class NewCheckinRulePageModule {}

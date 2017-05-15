import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRulePage } from './new-rule';

@NgModule({
  declarations: [
    NewRulePage,
  ],
  imports: [
    IonicPageModule.forChild(NewRulePage),
  ],
  exports: [
    NewRulePage
  ]
})
export class NewRulePageModule {}
